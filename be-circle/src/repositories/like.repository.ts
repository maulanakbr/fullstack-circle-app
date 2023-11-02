import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import { LikeEntity } from '@/entities/like.entity';

export default class LikeRepository extends Repository<LikeEntity> {
  public readonly likeRepo = dbConnection.getRepository(LikeEntity);
}
