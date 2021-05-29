import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class User {
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

}