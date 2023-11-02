import { Router } from 'express';

import type { Route } from '@/interfaces/router.interface';
import { LikeController } from '@/controllers/like.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export default class LikeRoute implements Route {
  public path = '/likes';
  public router: Router = Router();
  public likes = new LikeController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(`${this.path}`, [AuthMiddleware, this.likes.createLike]);
  }
}
