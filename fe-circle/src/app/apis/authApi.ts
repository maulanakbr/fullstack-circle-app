import type {
  AuthSignInRequest,
  AuthSignInResponse,
  AuthSignUpRequest,
  AuthSignUpResponse,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: build => ({
    signUp: build.mutation<AuthSignUpResponse, AuthSignUpRequest>({
      query: auth => ({
        url: '/auth/signup',
        method: 'POST',
        body: auth.body,
      }),
    }),
    signIn: build.mutation<AuthSignInResponse, AuthSignInRequest>({
      query: auth => ({
        url: '/auth/signin',
        method: 'POST',
        body: auth.body,
      }),
    }),
  }),
});

export default authApi;
