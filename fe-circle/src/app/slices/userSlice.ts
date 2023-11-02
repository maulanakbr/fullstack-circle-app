import type { ErrorValue, FetchUserResponse, SignInResponse } from '@/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import type { UserState } from '@/types/user';
import { httpRequest } from '@/lib/api';

import { RootState } from '../store';

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export const fetchUserData = createAsyncThunk<
  FetchUserResponse,
  string,
  { rejectValue: ErrorValue; state: RootState }
>('users/account', async (userId: string, { rejectWithValue, getState }) => {
  try {
    const signedInUser = getState().auth.auth as SignInResponse | null;
    const token = signedInUser && signedInUser.user.token;

    const config = { headers: { authorization: `Bearer ${token}` } };

    const response = await httpRequest.get(`/users/account/${userId}`, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue({
        message: error.response.data.message,
      });
    } else {
      return rejectWithValue({
        message: 'Cannot find user data',
      });
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserData.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<FetchUserResponse>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchUserData.rejected,
      (state, action: PayloadAction<ErrorValue | undefined>) => {
        state.loading = false;

        if (action.payload) {
          state.error = action.payload.message;
        }
      }
    );
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.thread.loading;
export const selectError = (state: RootState) => state.thread.error;

export const { setError } = userSlice.actions;
export default userSlice.reducer;
