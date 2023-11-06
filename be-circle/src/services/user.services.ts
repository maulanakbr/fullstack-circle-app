import type { Response } from 'express';
import { Service } from 'typedi';
import type { DeleteResult } from 'typeorm';

import type { UpdateUserPayload, User } from '@/interfaces/user.interface';
import { HttpException } from '@/exceptions/httpException';
import {
  extractFileUrl,
  removeImageFile,
  uploadFile,
} from '@/utils/cloudinary';
import UserRepository from '@/repositories/user.repository';

@Service()
export class UserService extends UserRepository {
  public async findAllUsers(): Promise<User[]> {
    const allUsers: User[] = await this.findUsers();
    if (!allUsers) throw new HttpException(404, `Users cannot be found`);

    return allUsers;
  }

  public async findOneUser(payload: string): Promise<User> {
    const user = await this.findUserById(payload);
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

  public async findAndUpdateUser(
    payload: UpdateUserPayload,
    isImage?: Express.Multer.File,
  ): Promise<User> {
    const userToUpdate = await this.userRepo.findOne({
      where: { id: payload.user },
    });
    if (!userToUpdate) throw new HttpException(404, `User cannot be found`);

    if (isImage) {
      const upload = await uploadFile(isImage);
      userToUpdate.user_image = upload.secure_url;
    }

    userToUpdate.fullname = payload.fullname;
    userToUpdate.username = payload.username;
    userToUpdate.description = payload.description;

    await this.userRepo.update(payload.user, userToUpdate);
    return userToUpdate;
  }
}
