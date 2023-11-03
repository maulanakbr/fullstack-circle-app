import type {
  AuthSignInPayload,
  AuthSignInRequest,
  AuthSignInResponse,
  AuthSignUpPayload,
  AuthSignUpRequest,
  AuthSignUpResponse,
  AuthState,
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
  AuthSignUpPayload,
  AuthSignUpRequest,
  AuthSignUpResponse,
  AuthSignInPayload,
  AuthSignInRequest,
  AuthSignInResponse,
  ErrorValue,
  FetchUserResponse,
  FollowPayload,
  FollowResponse,
  LikePayload,
  ReplyPayload,
  ReplyRequest,
  ReplyResponse,
  ThreadState,
  ThreadPayload,
  ThreadResponse,
};
