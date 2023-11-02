import type { NextFunction, Request, Response } from 'express';

import { HttpException } from '@/exceptions/httpException';
import { jwtVerify } from '@/utils/jwt';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new HttpException(401, 'Unauthorized'));
    }

    const token = authorization.split(' ')[1];

    try {
      const session = jwtVerify(token);
      res.locals.session = session;
    } catch (error) {
      next(new HttpException(401, 'Cannot authenticate'));
    }

    next();
  } catch (error) {
    next();
  }
};
