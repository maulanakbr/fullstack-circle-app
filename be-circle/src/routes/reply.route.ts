import { Router } from 'express';

import { Route } from '@/interfaces/router.interface';
import { ReplyController } from '@/controllers/reply.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Upload } from '@/middlewares/upload.middleware';

export default class ReplyRoute implements Route {
  public path = '/replies';
  public router: Router = Router();
  public replies = new ReplyController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(
      `${this.path}`,
      [AuthMiddleware, Upload.single('image')],
      this.replies.createReply,
    );
    this.router.get(`${this.path}/:id`, this.replies.findAllRepliesByThreadId);
  }
}
