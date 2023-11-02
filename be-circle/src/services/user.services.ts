import type { Response } from 'express';
import { Service } from 'typedi';
import type { DeleteResult } from 'typeorm';

import type { User } from '@/interfaces/user.interface';
import { HttpException } from '@/exceptions/httpException';
import { extractFileUrl, removeImageFile } from '@/utils/cloudinary';
import UserRepository from '@/repositories/user.repository';

@Service()
export class UserService extends UserRepository {
  public async findAllUsers(): Promise<User[]> {
    const allUsers: User[] = await this.findUsers();
    if (!allUsers) throw new HttpException(404, `Users cannot be found`);

    return allUsers;
  }

  public async findOneUser(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new HttpException(404, `User cannot be found`);

    return user;
  }

  public async findAndRemoveUser(payload: Response): Promise<DeleteResult> {
    const userToRemove = await this.findUserById(payload.locals.session.id);
    if (userToRemove.user_image) {
      const extractedImageUrl = extractFileUrl(userToRemove.user_image);
      await removeImageFile(extractedImageUrl);
    }

    return await this.userRepo.delete(userToRemove.id);
  }
}
