import { ReplyPayload } from '@/schemas';
import * as z from 'zod';

export type ReplyPayload = z.infer<typeof ReplyPayload>;

export type ReplyRequest = {
  body: ReplyPayload | FormData;
  token: string;
};

export type ReplyResponse = {
  id: string;
  content: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  thread: string;
  user: string;
};
