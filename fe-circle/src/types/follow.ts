type Follow = {
  userId: string;
};

export type FollowPayload = {
  body: Follow;
  token: string;
};

export type FollowResponse = {
  data: Array<{
    id: string;
    username: string;
    fullname: string;
    email: string;
    user_image: string;
    description: string;
  }>;
};
