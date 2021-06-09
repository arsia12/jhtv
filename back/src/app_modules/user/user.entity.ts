import { BoardEntity, LikeBoardEntity } from 'src/app_modules/board/board.entity';
import { CommentEntity, LikeCommentEntity } from 'src/app_modules/comment/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { bcrypt } from 'bcrypt';
import { SubscribeEntity } from '../channel/channel.entity';

// User.rank enum 필요

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'nickname' })
  nickname: string;

  @CreateDateColumn()
  regdate: Date;

  @Column({ name: 'rank', default: 1 })
  rank: number;

  @OneToMany(() => BoardEntity, (i) => i.user, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  board: BoardEntity[];

  @OneToMany(() => CommentEntity, (i) => i.user, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  comment: CommentEntity[];

  // @OneToOne(() => ChannelEntity, (i) => i.user, { cascade: true })
  // @JoinColumn()
  // channel: ChannelEntity;

  @OneToMany(() => SubscribeEntity, (i) => i.user, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  subscribe: SubscribeEntity[];

  @OneToMany(() => LikeBoardEntity, (i) => i.user, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  like_board: LikeBoardEntity[];

  @OneToMany(() => LikeCommentEntity, (i) => i.user, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  like_comment: LikeCommentEntity[];

  @BeforeInsert()
    async userEncryption(){
        this.password = await bcrypt.hash(this.password, 5);
    }

    comparePassword(password: string): boolean {
      return bcrypt.compare(password, this.password);
    }
}
