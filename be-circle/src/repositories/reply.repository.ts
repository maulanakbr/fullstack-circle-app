import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import { ReplyEntity } from '@/entities/reply.entity';

export default class ReplyRepository extends Repository<ReplyEntity> {
  public readonly replyRepo = dbConnection.getRepository(ReplyEntity);
}
