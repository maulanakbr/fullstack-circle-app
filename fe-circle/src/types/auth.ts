import {
  AuthError,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from '@/schemas/authSchema';
import z from 'zod';

export type AuthState = {
  auth: SignUpResponse | SignInResponse | null;
  error: string | null;
  loading: boolean;
};
export type AuthError = z.infer<typeof AuthError>;

export type SignUpPayload = z.infer<typeof SignUpPayload>;
export type SignUpResponse = {
  data: z.infer<typeof SignUpResponse>;
  message: string;
};

export type SignInPayload = z.infer<typeof SignInPayload>;
export type SignInResponse = z.infer<typeof SignInResponse>;
