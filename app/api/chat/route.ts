import { NextResponse } from "next/server";
import OpenAI from "openai";

// "gpt-4o"
// "Phi-3.5-MoE-instruct"
const model = "Phi-3.5-MoE-instruct"

export async function POST(req: Request) {
  const messages = await req.json();
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN
  });
  const response = await client.chat.completions.create({
    model: model,
    messages: messages,
    stream: true,
    stream_options: { include_usage: true }
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices[0]?.delta?.content || "";

        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}