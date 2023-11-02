import { Router } from 'express';

import type { Route } from '@/interfaces/router.interface';
import { SignInDto, UserDto } from '@/dtos/user.dto';
import { AuthController } from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Upload } from '@/middlewares/upload.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export default class AuthRoute implements Route {
  public path = '/auth';
  public router: Router = Router();
  public auth = new AuthController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      [Upload.single('user_image'), ValidationMiddleware(UserDto, true)],
      this.auth.signUp,
    );
    this.router.post(
      `${this.path}/signin`,
      ValidationMiddleware(SignInDto),
      this.auth.signIn,
    );
    this.router.get(
      `${this.path}/checkauth`,
      [AuthMiddleware, this.auth.checkIfSignedIn],
      this.auth.signIn,
    );
  }
}
