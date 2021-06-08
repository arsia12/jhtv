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

    async createUser(body : CreateUserDto) {
        await this.userRepository.save(body);
    }

    async getTestUser(id: number){
        return await this.userRepository.findOne(id);
    }
}
