import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository
    ){}

    async getTestUser(id: number){
        return await this.userRepository.findOne(id);
    }
}
