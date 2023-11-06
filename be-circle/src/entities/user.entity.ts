import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { ReplyEntity } from './reply.entity';
import { ThreadEntity } from './thread.entity';

@Entity({ name: 'users' })
@Unique(['email', 'username'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  fullname?: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    nullable: true,
  })
  user_image?: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @OneToMany(() => ThreadEntity, thread => thread.user, {
    onDelete: 'CASCADE',
  })
  threads: ThreadEntity[];

  @OneToMany(() => ReplyEntity, reply => reply.user, {
    onDelete: 'CASCADE',
  })
  replies: ReplyEntity[];

  @OneToMany(() => LikeEntity, like => like.user, {
    onDelete: 'CASCADE',
  })
  likes: LikeEntity[];
  @ManyToMany(() => UserEntity, user => user.followings, { cascade: true })
  @JoinTable({
    name: 'followers',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'followerId',
    },
  })
  followers: UserEntity[];

  @ManyToMany(() => UserEntity, user => user.followers)
  followings: UserEntity[];
}
