import type {
  AuthState,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from './auth';
import type { FollowPayload, FollowResponse } from './follow';
import type { LikePayload } from './like';
import type { ReplyPayload, ReplyRequest, ReplyResponse } from './reply';
import type { ThreadPayload, ThreadResponse, ThreadState } from './thread';
import type { FetchUserResponse } from './user';

type ErrorValue = {
  message: string;
};

export type {
  AuthState,
  ErrorValue,
  FetchUserResponse,
  FollowPayload,
  FollowResponse,
  LikePayload,
  ReplyPayload,
  ReplyRequest,
  ReplyResponse,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
  ThreadState,
  ThreadPayload,
  ThreadResponse,
};
