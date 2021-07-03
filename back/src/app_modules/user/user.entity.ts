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
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SubscribeEntity } from '../channel/channel.entity';

// User.rank enum 필요

const BCRYPT_ROUND = 10;
const default_img = 'back/uploads/no_img.png';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', unique : true})
  username: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'phone', unique : true })
  phone: string;

  @Column({ name: 'email', unique : true })
  email: string;

  @Column({ name: 'nickname', unique : true })
  nickname: string;

  @Column({ name: 'profile', default : default_img })
  profile: string;

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

  
  private hashPassword(password : string) : Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUND);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword() : Promise<void> {
    if(this.password) { 
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
}
