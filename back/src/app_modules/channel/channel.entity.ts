import { BoardEntity } from "src/app_modules/board/board.entity";
import { UserEntity } from "src/app_modules/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, OneToOne, CreateDateColumn } from "typeorm";

@Entity({name : 'Channel'})
export class ChannelEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : 'name'})
    name : string;

    @Column({name : 'content', type:'text'})
    content : string;

    @OneToMany(() => BoardEntity, (i) => i.channel, { cascade: true })
    @JoinColumn({
    name: 'id',
    referencedColumnName: 'channel_id',
    })
    board: BoardEntity[];

    @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name:'user_id'
    })
    user: UserEntity;

    @CreateDateColumn()
    regdate: Date;
}