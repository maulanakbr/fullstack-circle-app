import type { Response } from 'express';
import { Service } from 'typedi';

import type { FollowRequest } from '@/interfaces/follow.interface';
import { HttpException } from '@/exceptions/httpException';
import { UserEntity } from '@/entities/user.entity';
import UserRepository from '@/repositories/user.repository';

@Service()
export class FollowService extends UserRepository {
  public async createFollow(
    followData: FollowRequest,
    payload: Response,
  ): Promise<UserEntity[]> {
    const currentUser = await this.findCurrentUser(payload.locals.session.id);

    if (!currentUser)
      throw new HttpException(409, 'Current user cannot found in the database');

    const followingUser = await this.findFollowingUser(followData.userId);

    if (!followingUser)
      throw new HttpException(409, 'User cannot found in the database');

    currentUser.followings.push(followingUser);
    await this.userRepo.save(currentUser);

    return currentUser.followings;
  }
}
