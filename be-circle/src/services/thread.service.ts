import { Service } from 'typedi';

import type { Thread } from '@/interfaces/thread.interface';
import { HttpException } from '@/exceptions/httpException';
import { ThreadEntity } from '@/entities/thread.entity';
import ThreadRepository from '@/repositories/thread.repository';

@Service()
export class ThreadService extends ThreadRepository {
  public async createThread(threadData: Thread): Promise<Thread> {
    const { content, image, user } = threadData;

    const newThread: Thread = new ThreadEntity();
    newThread.content = content;
    newThread.image = image;
    newThread.user = user;

    await this.threadRepo.save(newThread);
    return newThread;
  }

  public async findAllCreatedThreads(): Promise<Thread[]> {
    const allThreads: Thread[] = await this.findThreads();
    if (!allThreads) throw new HttpException(404, 'Threads cannot be found');

    return allThreads;
  }

  public async findCurrentThread(threadId: string): Promise<Thread> {
    const currentThread: Thread = await this.findThreadId(threadId);
    if (!currentThread) throw new HttpException(404, 'Thread cannot be found');

    return currentThread;
  }

  public async findThreadsBelongToUser(userId: string): Promise<Thread[]> {
    const threadsBelongToUser: Thread[] =
      await this.findThreadsByUserId(userId);

    if (!threadsBelongToUser)
      throw new HttpException(404, 'Threads cannot be found');

    return threadsBelongToUser;
  }
}
