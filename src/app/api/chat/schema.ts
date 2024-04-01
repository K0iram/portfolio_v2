import { z } from 'zod'

const actionEnum = z.enum(["shareLink", "notifyMario"])
const actionPayload = z.discriminatedUnion("action", [
  z.object({ action: z.literal("shareLink"), url: z.string() })
]
)

export const schema = z.object({
  content: z.string(),
  action: actionEnum.optional().describe('action to be taken by the system based on the content of the conversation.'),
  actionPayload: actionPayload.optional().describe('parameters for the action to be taken by the system based on the content of the conversation.')
})