import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @Inject(REQUEST) private readonly request : Request,
        private readonly userRepository : UserRepository,
    ){}

    //회원가입
    async createUser(body : CreateUserDto) {
        await this.userRepository.save(this.userRepository.create(body));
    }

    //로그인시 아이디 유무 확인
    async existUsername(username : string){
        console.log(username);
        return await this.userRepository.findOne({username : username});
    }

    async getTestUser(id : number){
        return await this.userRepository.findOne(id);
    }
}
