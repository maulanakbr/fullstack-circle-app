import type { Thread } from './thread.interface';
import type { User } from './user.interface';

export interface Reply {
  id: string;
  content: string;
  image?: string;
  created_at: Date;
  updated_at: Date;
  thread: Thread;
  user: User;
}
