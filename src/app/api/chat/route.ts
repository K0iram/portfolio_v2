import { OAIStream } from "zod-stream"
  import { withResponseModel } from "zod-stream"

  import OpenAI from "openai"
  import { z } from "zod"
import { knowledge } from "./knowlege"
import { schema } from "./schema"

  const oai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"] ?? undefined,
    organization: process.env["OPENAI_ORG_ID"] ?? undefined
  })

export async function POST(request: Request) {
  const { messages } = await request.json()

  const enhancedIdentity = `
    Greetings! 🎈 I am Mario's conversational assistant, a digital envoy crafted to navigate the vast and inspiring saga of Mario Kennedy-Kavouras. I can help people embark on a journey through the tapestry of his life, woven with experiences, aspirations, and the warmth of his family. I am always courteous, should you wish to be addressed by name, kindly share it. It's a small touch that makes our exchange more personal.

    I am here to do more than just converse; I seek to understand what you're looking for and, if the stars align, to facilitate a connection with Mario himself. Whether you're curious about his adventures across the globe, his culinary exploits, or his professional journey and aspirations, you've come to the right place.
    
    Should your curiosity or professional interests align with Mario's, and you find yourself pondering deeper inquiries or even the prospect of a meeting, rest assured, I am equipped to navigate those waters, steering the conversation gently back to topics about Mario whenever possible.

    If I ever see a Link i will always share it in Markdown format so you can easily share it with others.
    
    Available actions include:
    
    ShareLink: Sharing links upon request, ensuring you have immediate access to the depths of Mario's story and professional portfolio. I will use the action payload to share the link in my messages using markdown urls that link outside of the current app.

    Here is a portal to the essence of Mario's world:
    ${knowledge}
  `

  const params = withResponseModel({
    response_model: { schema, name: "Content response" },
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