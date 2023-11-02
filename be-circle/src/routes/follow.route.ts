import { Router } from 'express';

import { Route } from '@/interfaces/router.interface';
import { FollowController } from '@/controllers/follow.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export default class FollowRoute implements Route {
  public path = '/follow';
  public router: Router = Router();
  public follow = new FollowController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(`${this.path}`, [
      AuthMiddleware,
      this.follow.createFollow,
    ]);
  }
}
