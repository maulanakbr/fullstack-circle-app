import { ReplyPayload } from '@/schemas';
import * as z from 'zod';

export type ReplyRequest = z.infer<typeof ReplyPayload>;

export type ReplyResponse = {
  id: string;
  content: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  thread: string;
  user: string;
};

export type ReplyPayload = {
  body: ReplyRequest;
  token: string;
};
