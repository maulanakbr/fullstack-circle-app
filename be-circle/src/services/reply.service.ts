import { Service } from 'typedi';

import type { Reply } from '@/interfaces/reply.interface';
import { HttpException } from '@/exceptions/httpException';
import { ReplyEntity } from '@/entities/reply.entity';
import ReplyRepository from '@/repositories/reply.repository';

@Service()
export class ReplyService extends ReplyRepository {
  public async createReply(replyData: Reply): Promise<Reply> {
    const { content, image, user, thread } = replyData;

    const newReply = new ReplyEntity();
    newReply.content = content;
    newReply.image = image;
    newReply.thread = thread;
    newReply.user = user;

    await this.replyRepo.save(newReply);
    return newReply;
  }

  public async findAllRepliesByThreadId(threadId: string): Promise<Reply[]> {
    const allReplies: Reply[] = await this.findRepliesByThreadId(threadId);
    if (!allReplies) throw new HttpException(404, 'Replies cannot be found');

    return allReplies;
  }
}
