import { JWT_EXPIRATION_TIME, JWT_SECRET } from '@/config';
import jwt from 'jsonwebtoken';

import type { User } from '@/interfaces/user.interface';

export const jwtSign = ({ id }: Pick<User, 'id'>) => {
  const accessToken = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return accessToken;
};

export const jwtVerify = (token: string): string => {
  const verifyToken = jwt.verify(token, JWT_SECRET) as string;
  return verifyToken;
};

// export const createCookie = (tokenData: TokenData): string => {
//   const { accessToken, expiresIn } = tokenData;
//   return `Authorization=${accessToken}; Path=/; HttpOnly=true; Max-Age=${expiresIn};`;
//   const { accessToken } = tokenData;
//   return accessToken;
// };
