import { BoardEntity } from "src/app_modules/board/board.entity";
import { UserEntity } from "src/app_modules/user/user.entity";
import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class ChannelEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : 'name'})
    name : string;

    @Column({name : 'user_id'})
    user_id : number;

    @Column({name : 'content'})
    content : Text;

    @OneToMany(() => BoardEntity, (i) => i.channel, { cascade: true })
    @JoinColumn({
    name: 'id',
    referencedColumnName: 'channel_id',
    })
    board: BoardEntity[];

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UserEntity;
}