import type { AuthSignInResponse, AuthState } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '../apis';
import { RootState } from '../store';

const initialState: AuthState = {
  auth: null,
  error: null,
  loading: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      state.auth = null;
      state.error = null;
      state.loading = false;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action: PayloadAction<AuthSignInResponse>) => {
        state.auth = action.payload;
        state.loading = false;
        state.error = null;
        state.token = action.payload.user && action.payload.user.token!;
      }
    );
  },
});

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
