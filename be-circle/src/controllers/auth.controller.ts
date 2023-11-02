import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import type { SignInPayload } from '@/interfaces/auth.interface';
import type { User } from '@/interfaces/user.interface';
import { uploadFile } from '@/utils/cloudinary';
import { hashPassword } from '@/utils/hash';
import { AuthService } from '@/services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authData: User = req.body;
      const imgToUpload = req.file;

      if (imgToUpload) {
        const upload = await uploadFile(imgToUpload);
        authData.user_image = upload.secure_url;
      }

      const hashedPassword = await hashPassword(authData.password);
      authData.password = hashedPassword;

      const { id, email, username, fullname, user_image, description } =
        await this.auth.signUp(authData);

      res.status(201).json({
        data: { id, email, username, fullname, user_image, description },
        message: 'Sign up successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authData: SignInPayload = req.body;
      const user = await this.auth.signIn(authData);

      res.status(201).json({
        user,
        message: 'Sign in successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public checkIfSignedIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.auth.checkIfSignedIn(res);

      res.status(201).json({
        data,
        message: 'You are already signed in',
      });
    } catch (error) {
      next(error);
    }
  };
}
