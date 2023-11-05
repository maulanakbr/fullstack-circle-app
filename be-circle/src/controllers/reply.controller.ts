import type { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import type { Reply } from '@/interfaces/reply.interface';
import { uploadFile } from '@/utils/cloudinary';
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

      const imgToUpload = req.file;

      if (imgToUpload) {
        const upload = await uploadFile(imgToUpload);
        replyData.image = upload.secure_url;
      }

      const createReplyData: Reply = await this.reply.createReply(replyData);

      res.status(201).json({
        data: createReplyData,
        message: 'Reply successfully created',
      });
    } catch (error) {
      next(error);
    }
  };

  public findAllRepliesByThreadId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const threadData = req.params.id;
      const allReplies = await this.reply.findAllRepliesByThreadId(threadData);

      res.status(201).json({ data: allReplies, message: 'Found all replies' });
    } catch (error) {
      next(error);
    }
  };
}
