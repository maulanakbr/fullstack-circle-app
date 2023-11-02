import type { Thread } from './thread.interface';
import type { User } from './user.interface';

export interface Like {
  id: string;
  user: User;
  thread: Thread;
}

export interface LikeRequest extends Like {
  user: User;
  thread: Thread;
}
