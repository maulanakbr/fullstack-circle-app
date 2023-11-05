import {
  ThreadArrayResponse,
  ThreadPayload,
  ThreadResponse,
} from '@/schemas/threadSchema';
import * as z from 'zod';

import type { AuthState } from '.';

export type ThreadState = {
  thread: ThreadResponse | null;
} & Omit<AuthState, 'auth'>;

export type ThreadPayload = z.infer<typeof ThreadPayload>;
export type ThreadResponse = z.infer<typeof ThreadResponse>;
export type ThreadArrayResponse = z.infer<typeof ThreadArrayResponse>;
