import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import { Thread } from '@/interfaces/thread.interface';
import { ThreadEntity } from '@/entities/thread.entity';

export default class ThreadRepository extends Repository<ThreadEntity> {
  public readonly threadRepo = dbConnection.getRepository(ThreadEntity);

  protected async findThreadId(id: string): Promise<Thread> {
    const result: Thread = await this.threadRepo.findOne({
      select: {
        id: true,
        content: true,
        image: true,
        posted_at: true,
        user: {
          id: true,
          username: true,
          fullname: true,
          user_image: true,
        },
        likes: {
          id: true,
          user: {
            id: true,
            username: true,
            fullname: true,
            user_image: true,
          },
        },
        replies: {
          id: true,
          content: true,
          image: true,
          created_at: true,
          user: {
            id: true,
            username: true,
            fullname: true,
            user_image: true,
          },
        },
      },
      where: { id },
      relations: {
        user: true,
        likes: {
          user: true,
        },
        replies: {
          user: true,
        },
      },
      order: {
        replies: {
          created_at: 'DESC',
        },
      },
    });

    return result;
  }

  protected async findThreadsByUserId(userId: string): Promise<Thread[]> {
    const result: Thread[] = await this.threadRepo.find({
      select: {
        id: true,
        content: true,
        image: true,
        posted_at: true,
        user: {
          id: true,
          username: true,
          fullname: true,
          user_image: true,
        },
        likes: {
          id: true,
          user: {
            id: true,
            username: true,
            fullname: true,
          },
        },
        replies: {
          id: true,
          content: true,
          image: true,
          user: {
            id: true,
            username: true,
            fullname: true,
          },
        },
      },
      relations: {
        user: true,
        likes: {
          user: true,
        },
        replies: {
          user: true,
        },
      },
      order: {
        posted_at: 'DESC',
      },
      where: {
        user: {
          id: userId,
          followings: {
            threads: true,
          },
        },
      },
    });

    return result;
  }

  protected async findThreads(): Promise<Thread[]> {
    const result: Thread[] = await this.threadRepo.find({
      select: {
        id: true,
        content: true,
        image: true,
        posted_at: true,
        user: {
          id: true,
          username: true,
          fullname: true,
          user_image: true,
        },
        likes: {
          id: true,
          user: {
            id: true,
            username: true,
            fullname: true,
          },
        },
        replies: {
          id: true,
          content: true,
          image: true,
          user: {
            id: true,
            username: true,
            fullname: true,
          },
        },
      },
      relations: {
        user: true,
        likes: {
          user: true,
        },
        replies: {
          user: true,
        },
      },
      order: {
        posted_at: 'DESC',
      },
    });

    return result;
  }
}
