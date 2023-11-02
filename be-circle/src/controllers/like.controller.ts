import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import type { LikeRequest } from '@/interfaces/like.interface';
import { LikeService } from '@/services/like.service';

export class LikeController {
  public like = Container.get(LikeService);

  public createLike = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const likeData: LikeRequest = req.body;
      likeData.user = res.locals.session.id;

      await this.like.createLike(likeData);

      res.status(201).json({
        message: 'Like created successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
