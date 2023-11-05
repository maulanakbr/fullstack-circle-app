import * as z from 'zod';

export const ThreadPayload = z.object({
  content: z.string(),
  image: z.string(),
});

export const ThreadResponse = z.object({
  data: z.object({
    id: z.string(),
    content: z.string(),
    image: z.string().nullable(),
    posted_at: z.date(),
    user: z.object({
      id: z.string(),
      username: z.string(),
      fullname: z.string(),
      user_image: z.string(),
    }),
    likes: z
      .object({
        id: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string(),
          fullname: z.string(),
        }),
      })
      .array(),
    replies: z
      .object({
        id: z.string(),
        content: z.string(),
        image: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string(),
          fullname: z.string(),
        }),
      })
      .array(),
  }),
});

export const ThreadArrayResponse = z.object({
  data: z
    .object({
      id: z.string(),
      content: z.string(),
      image: z.string().nullable(),
      posted_at: z.date(),
      user: z.object({
        id: z.string(),
        username: z.string(),
        fullname: z.string(),
        user_image: z.string(),
      }),
      likes: z
        .object({
          id: z.string(),
          user: z.object({
            id: z.string(),
            username: z.string(),
            fullname: z.string(),
          }),
        })
        .array(),
      replies: z
        .object({
          id: z.string(),
          content: z.string(),
          image: z.string(),
          user: z.object({
            id: z.string(),
            username: z.string(),
            fullname: z.string(),
          }),
        })
        .array(),
    })
    .array(),
});
