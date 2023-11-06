import type { Like } from './like.interface';
import type { Reply } from './reply.interface';
import type { Thread } from './thread.interface';

export interface User {
  id: string;
  username: string;
  fullname?: string;
  email: string;
  password: string;
  user_image?: string;
  description?: string;
  threads: Thread[];
  replies: Reply[];
  likes: Like[];
  followings: User[];
  followers: User[];
}

export interface UpdateUserPayload
  extends Pick<User, 'fullname' | 'username' | 'user_image' | 'description'> {
  user: string;
}
