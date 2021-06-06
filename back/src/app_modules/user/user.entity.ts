import { BoardEntity } from "src/app_modules/board/board.entity";
import { CommentEntity } from "src/app_modules/comment/comment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, OneToOne } from "typeorm";

// User.rank enum 필요

@Entity({ name : 'User'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'nickname' })
  nickname: string;

  @CreateDateColumn({ name: 'regdate', nullable: true })
  regdate: Date;

  @Column({ name: 'rank' })
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
}
