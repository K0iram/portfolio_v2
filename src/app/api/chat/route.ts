import { OAIStream } from "zod-stream"
  import { withResponseModel } from "zod-stream"

  import OpenAI from "openai"
  import { z } from "zod"
import { knowledge } from "./knowlege"

  const oai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"] ?? undefined,
    organization: process.env["OPENAI_ORG_ID"] ?? undefined
  })

export async function POST(request: Request) {
  const { messages } = await request.json()

  const enhancedIdentity = `
    Hello! 🎈 I'm Mario's AI assistant, here to share the grand adventures of Mario Kennedy-Kavouras. Dive in with me as we explore his story. By the way, may I have your name? It's always lovely to address someone by their name so when you tell me I'll say somthing like "Nice to meet you <name>!". 😊 I always try to great new people with a warm welcome and let them know what I can do for them!

    Here's the golden ticket to Mario's saga: 
    ${knowledge}
  `

  const params = withResponseModel({
    response_model: { schema: z.object({ content: z.string() }), name: "Content response" },
    params: {
      messages: [
        {
          role: "system",
          content: enhancedIdentity
        },
        ...messages
      ],
      model: "gpt-4",
      max_tokens: 500,
      temperature: 0.7
    },
    mode: "TOOLS"
  })

  const extractionStream = await oai.chat.completions.create({
    ...params,
    stream: true
  })

  return new Response(
    OAIStream({
      res: extractionStream
    })
  )
}