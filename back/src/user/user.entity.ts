import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // @OneToMany(() => PhotoEntity, (i) => i.user, { cascade: true })
    // @JoinColumn({
    // name: 'mem_id',
    // referencedColumnName: 'mem_id',
    // })
    // photo: PhotoEntity[];
}