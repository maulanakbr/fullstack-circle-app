import { Router } from 'express';

import { Route } from '@/interfaces/router.interface';
// import { ThreadDto } from '@/dtos/thread.dto';
import { ThreadController } from '@/controllers/thread.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Upload } from '@/middlewares/upload.middleware';

// import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export default class ThreadRoute implements Route {
  public path = '/threads';
  public router: Router = Router();
  public threads = new ThreadController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.get(`${this.path}`, this.threads.findAllThreads);
    this.router.get(
      `${this.path}/user`,
      AuthMiddleware,
      this.threads.findThreadsBelongToUser,
    );
    this.router.post(
      `${this.path}`,
      [AuthMiddleware, Upload.single('image')],
      this.threads.createThread,
    );
  }
}
