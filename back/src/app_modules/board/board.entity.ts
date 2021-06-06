import { ChannelEntity } from 'src/app_modules/channel/channel.entity';
import { CommentEntity } from 'src/app_modules/comment/comment.entity';
import { UserEntity } from 'src/app_modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Board' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'movie' })
  movie: string;

  @Column({ name: 'read_count', default: 0 })
  read_count: number;

  @CreateDateColumn()
  regdate: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (i) => i.board, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'comment_id',
  })
  comment: CommentEntity[];

  @ManyToOne(() => ChannelEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'channel_id',
    referencedColumnName: 'id',
  })
  channel: ChannelEntity;
}
