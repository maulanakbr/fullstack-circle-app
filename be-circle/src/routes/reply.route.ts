import { Router } from 'express';

import { Route } from '@/interfaces/router.interface';
import { ReplyDto } from '@/dtos/reply.dto';
import { ReplyController } from '@/controllers/reply.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export default class ReplyRoute implements Route {
  public path = '/replies';
  public router: Router = Router();
  public replies = new ReplyController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(`${this.path}`, [
      ValidationMiddleware(ReplyDto, true),
      AuthMiddleware,
      this.replies.createReply,
    ]);
  }
}
