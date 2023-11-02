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

export const SignUpPayload = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
  fullname: z.string(),
});

export const SignInPayload = SignUpPayload.pick({
  email: true,
  password: true,
});

export const SignUpResponse = UserResponse;

export const SignInResponse = z.object({
  user: z.object({
    data: UserResponse,
    token: z.string(),
  }),
});
