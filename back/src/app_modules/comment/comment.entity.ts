import { BoardEntity } from "src/app_modules/board/board.entity";
import { UserEntity } from "src/app_modules/user/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class CommentEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : 'board_id'})
    board_id : number;

    @Column({name : 'user_id'})
    user_id : number;

    @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'board_id',
        referencedColumnName: 'id',
    })
    board : BoardEntity;
    
    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UserEntity;
}