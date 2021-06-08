import { BoardEntity } from "src/app_modules/board/board.entity";
import { UserEntity } from "src/app_modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Todo : 좋아요 ManyToMany 

@Entity({ name : 'Comment'})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  regdate: Date;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'board_id',
    referencedColumnName: 'id',
  })
  board: BoardEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
