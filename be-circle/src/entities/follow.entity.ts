import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'follow' })
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followers_id' })
  followers: UserEntity;
}
