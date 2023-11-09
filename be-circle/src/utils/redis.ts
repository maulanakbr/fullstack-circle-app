import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '@/config';
import { Redis } from '@upstash/redis';

const client = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

export default client;
