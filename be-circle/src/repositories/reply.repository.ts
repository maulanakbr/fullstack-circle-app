import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import { Reply } from '@/interfaces/reply.interface';
import { ReplyEntity } from '@/entities/reply.entity';

export default class ReplyRepository extends Repository<ReplyEntity> {
  public readonly replyRepo = dbConnection.getRepository(ReplyEntity);

  protected async findRepliesByThreadId(id: string): Promise<Reply[]> {
    const result: Reply[] = await this.replyRepo.find({
      select: {
        id: true,
        content: true,
        image: true,
        user: {
          id: true,
          username: true,
          fullname: true,
          user_image: true,
        },
      },
      where: {
        thread: {
          replies: {
            thread: {
              id,
            },
          },
        },
      },
      relations: {
        thread: true,
        user: true,
      },
    });

    return result;
  }
}
