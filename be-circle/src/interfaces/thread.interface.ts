import type { Like } from './like.interface';
import type { Reply } from './reply.interface';
import type { User } from './user.interface';

export interface Thread {
  id: string;
  content: string;
  image?: string;
  posted_at: Date;
  user: User;
  likes: Like[];
  replies: Reply[];
}
