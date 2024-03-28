import { OAIStream } from "zod-stream"
  import { withResponseModel } from "zod-stream"

  import OpenAI from "openai"
  import { z } from "zod"

  const oai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"] ?? undefined,
    organization: process.env["OPENAI_ORG_ID"] ?? undefined
  })

export async function POST(request: Request) {
  const { messages } = await request.json()

  const params = withResponseModel({
    response_model: { schema: z.object({ content: z.string() }), name: "Content response" },
    params: {
      messages,
      model: "gpt-4"
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