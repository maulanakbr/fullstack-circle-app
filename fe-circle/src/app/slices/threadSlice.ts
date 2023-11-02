import type {
  ErrorValue,
  SignInResponse,
  ThreadPayload,
  ThreadResponse,
  ThreadState,
} from '@/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { httpRequest } from '@/lib/api';

import { RootState } from '../store';

const initialState: ThreadState = {
  thread: null,
  error: null,
  loading: false,
};

export const createThread = createAsyncThunk<
  ThreadResponse,
  ThreadPayload,
  { rejectValue: ErrorValue; state: RootState }
>(
  'thread/create',
  async (payload: ThreadPayload, { rejectWithValue, getState }) => {
    try {
      const signedInUser = getState().auth.auth as SignInResponse | null;
      const token = signedInUser && signedInUser.user.token;

      const config = { headers: { authorization: `Bearer ${token}` } };

      const response = await httpRequest.post('/threads', payload, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue({
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue({
          message: 'Cannot create thread',
        });
      }
    }
  }
);

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createThread.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createThread.fulfilled,
      (state, action: PayloadAction<ThreadResponse>) => {
        state.thread = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      createThread.rejected,
      (state, action: PayloadAction<ErrorValue | undefined>) => {
        state.loading = false;

        if (action.payload) {
          state.error = action.payload.message;
        }
      }
    );
  },
});

export const selectThread = (state: RootState) => state.thread.thread;
export const selectLoading = (state: RootState) => state.thread.loading;
export const selectError = (state: RootState) => state.thread.error;

export const { setError } = threadSlice.actions;
export default threadSlice.reducer;
