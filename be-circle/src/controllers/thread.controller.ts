import { ThreadService } from '@services/thread.service';
import type { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import type { Thread } from '@/interfaces/thread.interface';
import { uploadFile } from '@/utils/cloudinary';

export class ThreadController {
  private thread = Container.get(ThreadService);

  public createThread = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const threadData: Thread = req.body;
      threadData.user = res.locals.session.id;

      const imgToUpload = req.file;

      if (imgToUpload) {
        const upload = await uploadFile(imgToUpload);
        threadData.image = upload.secure_url;
      }

      const createThreadData: Thread =
        await this.thread.createThread(threadData);

      res.status(201).json({
        data: createThreadData,
        message: 'Thread successfully created',
      });
    } catch (error) {
      next(error);
    }
  };

  public findAllThreads = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const allThreads = await this.thread.findAllCreatedThreads();

      res.status(201).json({ data: allThreads, message: 'Found all threads' });
    } catch (error) {
      next(error);
    }
  };

  public findThreadsBelongToUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const session = res.locals.session;
      const threadsBelongToUser = await this.thread.findThreadsBelongToUser(
        session.id,
      );

      res.status(201).json({
        data: threadsBelongToUser,
        message: 'Found all threads belong to user',
      });
    } catch (error) {
      next(error);
    }
  };

  public findCurrentThread = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const threadData: Thread = req.body;
      const currentThread = await this.thread.findCurrentThread(threadData.id);

      res.status(201).json({
        data: currentThread,
        message: 'Found a thread',
      });
    } catch (error) {
      next(error);
    }
  };
}
