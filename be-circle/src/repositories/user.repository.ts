import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import type { User } from '@/interfaces/user.interface';
import { UserEntity } from '@/entities/user.entity';

export default class UserRepository extends Repository<UserEntity> {
  public readonly userRepo = dbConnection.getRepository(UserEntity);

  protected async findUserByEmail(email: string): Promise<User> {
    const result: User = await this.userRepo.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        fullname: true,
        user_image: true,
        description: true,
        followings: {
          id: true,
          fullname: true,
          username: true,
          user_image: true,
        },
        followers: {
          id: true,
          fullname: true,
          username: true,
          user_image: true,
        },
      },
      relations: {
        followings: true,
        followers: true,
      },
      where: { email },
    });

    return result;
  }

  protected async findUserById(id: string): Promise<User> {
    const result: User = await this.userRepo.findOne({
      where: { id },
      select: {
        id: true,
        fullname: true,
        username: true,
        user_image: true,
        description: true,
        threads: {
          id: true,
          content: true,
          image: true,
          posted_at: true,
          user: {
            fullname: true,
            username: true,
            user_image: true,
          },
        },
        replies: {
          id: true,
          content: true,
          image: true,
        },
        likes: {
          id: true,
          thread: {
            id: true,
            content: true,
            image: true,
            posted_at: true,
          },
        },
      },
      relations: {
        replies: true,
        threads: {
          user: true,
        },
        likes: {
          thread: true,
        },
      },
    });

    return result;
  }

  protected async findUsers(): Promise<User[]> {
    const result: User[] = await this.userRepo.find({
      select: {
        id: true,
        fullname: true,
        username: true,
        user_image: true,
        description: true,
        threads: {
          id: true,
          content: true,
          image: true,
        },
        replies: {
          id: true,
          content: true,
          image: true,
        },
        likes: {
          id: true,
          thread: {
            id: true,
            content: true,
            image: true,
          },
        },
        followings: {
          id: true,
          fullname: true,
          username: true,
        },
        followers: {
          id: true,
          fullname: true,
          username: true,
        },
      },
      relations: {
        replies: true,
        threads: true,
        likes: {
          thread: true,
        },
        followings: true,
        followers: true,
      },
    });

    return result;
  }

  protected async findCurrentUser(id: string): Promise<UserEntity> {
    const result: UserEntity = await this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        followings: true,
      },
    });

    return result;
  }

  protected async findFollowingUser(id: string): Promise<UserEntity> {
    const result: UserEntity = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
