import { dbConnection } from '@/database';
import { Repository } from 'typeorm';

import { FollowEntity } from '@/entities/follow.entity';

export default class FollowRepository extends Repository<FollowEntity> {
  public readonly followRepo = dbConnection.getRepository(FollowEntity);
}
