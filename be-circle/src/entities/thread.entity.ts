import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LikeEntity } from './like.entity';
import { ReplyEntity } from './reply.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'threads' })
export class ThreadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_at: Date;

  @ManyToOne(() => UserEntity, user => user.threads, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => LikeEntity, like => like.thread, {
    onDelete: 'CASCADE',
  })
  likes: LikeEntity[];

  @OneToMany(() => ReplyEntity, reply => reply.thread, {
    onDelete: 'CASCADE',
  })
  replies: ReplyEntity[];
}
