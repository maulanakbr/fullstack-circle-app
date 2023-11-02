import { Service } from 'typedi';

import type { Like } from '@/interfaces/like.interface';
import LikeRepository from '@/repositories/like.repository';

@Service()
export class LikeService extends LikeRepository {
  public async createLike(likeData: Like): Promise<Like> {
    const newLike = this.likeRepo.create(likeData);
    await this.likeRepo.save(newLike);

    return newLike;
  }
}
