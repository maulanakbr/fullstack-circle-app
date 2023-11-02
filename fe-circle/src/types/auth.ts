import {
  AuthError,
  AuthSignInPayload,
  AuthSignInResponse,
  AuthSignUpPayload,
  AuthSignUpResponse,
} from '@/schemas';
import z from 'zod';

/* Refactor */
export type AuthState = {
  auth: AuthSignInResponse | null;
  error: string | null;
  loading: boolean;
  token: string | null;
};
export type AuthError = z.infer<typeof AuthError>;

export type AuthSignUpPayload = z.infer<typeof AuthSignUpPayload>;

export type AuthSignUpRequest = {
  body: AuthSignUpPayload;
};

export type AuthSignUpResponse = {
  data: z.infer<typeof AuthSignUpResponse>;
};

export type AuthSignInPayload = z.infer<typeof AuthSignInPayload>;

export type AuthSignInRequest = {
  body: AuthSignInPayload;
};

export type AuthSignInResponse = {
  data: z.infer<typeof AuthSignInResponse>;
};
