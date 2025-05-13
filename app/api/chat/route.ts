import OpenAI from "openai";

// "gpt-4o"
// "Phi-3.5-MoE-instruct"
const model = "gpt-4o"

export async function POST(req: Request) {
  const request = await req.json();
  
  const user = request.userInfos;
  const messagesUser = request.message;


  const messages = [
    {
      role: "system",
      content: "You are a nutritionist and you should never talk about anything other than general health.",
    },
    {
      role: "user",
      content: `caso nessesario, lembrese que meus dados: 
        TDEE =  ${user?.TDEE} 
        TMB = ${user?.TMB} 
        altura =  ${user?.altura} 
        idade =  ${user?.idade} 
        peso =  ${user?.peso} 
        sexo =  ${user?.sexo}`

    },
    ...messagesUser
  ]

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