import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ThreadEntity } from './thread.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'replies' })
export class ReplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ThreadEntity, thread => thread.replies, {
    onDelete: 'CASCADE',
  })
  thread: ThreadEntity;

  @ManyToOne(() => UserEntity, user => user.replies, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
