import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import type { Reply } from '@/interfaces/reply.interface';
import { ReplyService } from '@/services/reply.service';

export class ReplyController {
  private reply = Container.get(ReplyService);

  public createReply = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const replyData: Reply = req.body;
      replyData.user = res.locals.session.id;

      const createReplyData: Reply = await this.reply.createReply(replyData);

      res.status(201).json({
        data: createReplyData,
        message: 'Reply successfully created',
      });
    } catch (error) {
      next(error);
    }
  };
}
