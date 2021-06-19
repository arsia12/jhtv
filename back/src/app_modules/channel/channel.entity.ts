import { BoardEntity } from 'src/app_modules/board/board.entity';
import { UserEntity } from 'src/app_modules/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Channel' })
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique : true })
  name: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @OneToMany(() => BoardEntity, (i) => i.channel, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'channel_id',
  })
  board: BoardEntity[];

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @CreateDateColumn()
  regdate: Date;

  @OneToMany(() => SubscribeEntity, (i) => i.channel, { cascade: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'channel_id',
  })
  subscribe: SubscribeEntity[];

//   ManyToMany 사용법 (하지만 실무에서 지양)
//   @ManyToMany(() => UserEntity, (user) => user.id, { cascade: true })
//   @JoinTable({
//     name: "channel_user",
//     joinColumn: {
//         name: "channel_id",
//         referencedColumnName: "id"
//     },
//     inverseJoinColumn: {
//         name: "user_id",
//         referencedColumnName: "id"
//     }
// })
//   subscribe: UserEntity[];

// 1:N 테이블 2개를 연결 
}

@Entity({ name: 'Channel_User'})
export class SubscribeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ChannelEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'channel_id',
      referencedColumnName: 'id',
    })
    channel: ChannelEntity;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id',
    })
    user: UserEntity;

    @CreateDateColumn()
    regdate: Date;
}

@Entity({ name: 'Premium_User'})
export class PremiumEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ChannelEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'channel_id',
      referencedColumnName: 'id',
    })
    channel: ChannelEntity;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id',
    })
    user: UserEntity;

    @Column({ name : 'level', default : '1'})
    level : number;

    @CreateDateColumn()
    regdate: Date;
}
