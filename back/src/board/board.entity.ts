import { ChannelEntity } from "src/channel/channel.entity";
import { CommentEntity } from "src/comment/comment.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class BoardEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : 'channel_id'})
    channel_id : number;

    @Column({name : 'movie'})
    movie : string;

    @Column({name : 'read_count'})
    read_count : number;

    @CreateDateColumn()
    regdate : Date;


    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UserEntity;

    @OneToMany(() => CommentEntity, (i) => i.board, { cascade: true })
    @JoinColumn({
    name: 'id',
    referencedColumnName: 'board_id',
    })
    board: BoardEntity[];

    @ManyToOne(() => ChannelEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'channel_id',
        referencedColumnName: 'id',
    })
    channel : ChannelEntity;
}