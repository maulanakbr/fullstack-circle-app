import { Service } from 'typedi';

import type { Reply } from '@/interfaces/reply.interface';
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
}
