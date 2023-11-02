import type { ThreadData } from '@/types';
import axios, { isAxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchThreadData = async (): Promise<ThreadData[] | undefined> => {
  try {
    const request = await axios.get(`${BASE_URL}/threads`);
    const { data } = await request.data;

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }

    return undefined;
  }
};
