import * as z from 'zod';

export const ReplyPayload = z.object({
  content: z.string(),
  image: z.string(),
  thread: z.string(),
});
