import { Router } from 'express';

import type { Route } from '@/interfaces/router.interface';
import { UserController } from '@/controllers/user.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export default class UserRoute implements Route {
  public path = '/users';
  public router: Router = Router();
  public users = new UserController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.get(`${this.path}`, this.users.findAllUsers);
    this.router.get(
      `${this.path}/account/:id`,
      AuthMiddleware,
      this.users.findUserById,
    );
    this.router.delete(
      `${this.path}/remove`,
      AuthMiddleware,
      this.users.removeUser,
    );
  }
}
