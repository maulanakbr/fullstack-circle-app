import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { UpdateUserPayload } from '@/interfaces/user.interface';
import { UserService } from '@/services/user.services';

export class UserController {
  public user = Container.get(UserService);

  public findAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const allUsers = await this.user.findAllUsers();

      res.status(201).json({
        data: allUsers,
        message: 'Found all users data',
      });
    } catch (error) {
      next(error);
    }
  };

  public findUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.params.id;
      const user = await this.user.findOneUser(userId);

      res.status(201).json({
        data: user,
        message: 'Found user data',
      });
    } catch (error) {
      next(error);
    }
  };

  public removeUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.user.findAndRemoveUser(res);

      res.status(201).json({
        message: 'User removed successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userToUpdate: UpdateUserPayload = req.body;
      const imgToUpload = req.file;
      const session = res.locals.session.id;

      userToUpdate.user = session;

      console.log(userToUpdate);

      await this.user.findAndUpdateUser(userToUpdate, imgToUpload);
      res.status(201).json({
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
