import type { AuthState } from '.';

export type UserState = {
  user: FetchUserResponse | null;
} & Omit<AuthState, 'auth'>;

export type FetchUserResponse = {
  data: Array<{
    id: string;
    username: string;
    fullname: string;
    user_image?: string;
    description?: string | null;
    threads: Array<{
      id: string;
      content: string;
      image: string;
      posted_at: Date;
      user: {
        username: string;
        fullname: string;
        user_image: string;
      };
    }>;
    replies: Array<{ id: string; content: string; image: string }>;
    likes: Array<{
      id: string;
      thread: { id: string; content: string; image: string };
    }>;
  }>;
};
