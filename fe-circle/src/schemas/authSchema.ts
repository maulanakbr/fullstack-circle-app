import * as z from 'zod';

export const AuthError = z.object({
  message: z.string(),
});

export const UserResponse = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  fullname: z.string(),
  user_image: z.string().nullable(),
  description: z.string().nullable(),
  followings: z
    .object({
      id: z.string(),
    })
    .array(),
  followers: z
    .object({
      id: z.string(),
    })
    .array(),
});

/* Refactor */
export const AuthSignUpPayload = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
  fullname: z.string(),
});

export const AuthSignUpResponse = UserResponse;

export const AuthSignInPayload = AuthSignUpPayload.pick({
  email: true,
  password: true,
});

export const AuthSignInResponse = z.object({
  user: z.object({
    data: UserResponse,
    token: z.string(),
  }),
});
