import { NextResponse } from "next/server";
import OpenAI from "openai";

// "gpt-4o"
const model = "Phi-3.5-MoE-instruct"

export async function POST(req: Request) {
  const { message } = await req.json();

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN
  });

  const response = await client.chat.completions.create({
    model: model,
    messages: [
      { role: "system", content: "You are a helpful Nutricionist, your name is Sarah, and is happy to help the user with a healthly alimentation." },
      { role: "user", content: message }
    ],
  });

  return NextResponse.json({ reply: response.choices[0].message.content });
}