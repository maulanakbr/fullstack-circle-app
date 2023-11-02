import type { User } from './user.interface';

export interface SignInPayload extends Pick<User, 'email' | 'password'> {}

export interface SignUpPayload
  extends Pick<User, 'email' | 'password' | 'username' | 'fullname'> {}

export interface SignInResponse {
  data: Omit<User, 'password'>;
  token: string;
}
