import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import type { FollowRequest } from '@/interfaces/follow.interface';
import type { User } from '@/interfaces/user.interface';
import { FollowService } from '@/services/follow.service';

export class FollowController {
  private follow = Container.get(FollowService);

  public createFollow = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const followData: FollowRequest = req.body;

      const createFollowData: User[] = await this.follow.createFollow(
        followData,
        res,
      );

      res.status(201).json({
        data: createFollowData,
        message: 'Follow successfully created',
      });
    } catch (error) {
      next(error);
    }
  };
}
