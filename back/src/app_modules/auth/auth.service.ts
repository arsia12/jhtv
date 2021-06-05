import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user_login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
    ) {}

    async validateUser(body : UserLoginDto) : Promise<any>{
        // console.log(body.user_id);
        // const user = await this.userService
    }
 }
