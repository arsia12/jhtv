import { BoardEntity } from "src/app_modules/board/board.entity";
import { ChannelEntity } from "src/app_modules/channel/channel.entity";
import { CommentEntity } from "src/app_modules/comment/comment.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { bcrypt } from "bcrypt";

@Entity({ name : 'User'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : 'username'})
    username : string;

    @Column({name : 'password'})
    password : string;

    @Column({name : 'phone'})
    phone : string;

    @Column({name : 'email'})
    email : string;

    @Column({name : 'nickname'})
    nickname : string;

    @CreateDateColumn({name : 'regdate'})
    regdate : Date;

    @Column({name : 'rank'})
    rank : number;

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

    @OneToMany(() => ChannelEntity, (i) => i.user, { cascade: true })
    @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
    })
    channel : ChannelEntity[];

    @BeforeInsert()
    async userEncryption(){
        this.password = await bcrypt.hash(this.password, 5);
    }
}