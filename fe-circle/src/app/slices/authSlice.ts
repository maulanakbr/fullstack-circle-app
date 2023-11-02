import type {
  AuthState,
  ErrorValue,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from '@/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { httpRequest } from '@/lib/api';

import { RootState } from '../store';

const initialState: AuthState = {
  auth: null,
  error: null,
  loading: false,
};

export const signUp = createAsyncThunk<
  SignUpResponse,
  SignUpPayload,
  { rejectValue: ErrorValue }
>('auth/signup', async (payload: SignUpPayload, { rejectWithValue }) => {
  try {
    const response = await httpRequest.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue({
        message: error.response.data.message,
      });
    } else {
      return rejectWithValue({
        message: 'Cannot sign up with current user data',
      });
    }
  }
});

export const signIn = createAsyncThunk<
  SignInResponse,
  SignInPayload,
  { rejectValue: ErrorValue }
>('auth/signin', async (payload: SignInPayload, { rejectWithValue }) => {
  try {
    const response = await httpRequest.post('/auth/signin', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue({
        message: error.response.data.message,
      });
    } else {
      return rejectWithValue({
        message: 'Cannot sign in with current user data',
      });
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    signOut: state => {
      state.auth = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(signUp.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(
      signUp.rejected,
      (state, action: PayloadAction<ErrorValue | undefined>) => {
        state.loading = false;

        if (action.payload) {
          state.error = action.payload.message;
        }
      }
    );
    builder.addCase(signIn.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<SignInResponse>) => {
        state.auth = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      signIn.rejected,
      (state, action: PayloadAction<ErrorValue | undefined>) => {
        state.loading = false;

        if (action.payload) {
          state.error = action.payload.message;
        }
      }
    );
  },
});

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export const { setError, signOut } = authSlice.actions;
export default authSlice.reducer;
