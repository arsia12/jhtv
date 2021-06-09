import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user_login.dto';
import * as bcrypt from 'bcrypt';
import { GlobalException } from 'src/common/exceptions/global_exception';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
    ) {}

    async validateUser(body : UserLoginDto) : Promise<any>{
        const user = await this.userService.existUsername(body.username);

        console.log(user.password);
        if(!user){
            throw new NotFoundException({
                status : HttpStatus.NOT_FOUND,
                error : '존재하지 않는 유저 입니다.',
            })
        }

        const isPasswordValid = this.validateHash(
            body.password,
            user && user.password,
        );

        if (isPasswordValid){
            const { password, ...result } = user;
            return result;
        } else { 
            throw new GlobalException({
                statusCode : HttpStatus.BAD_REQUEST,
                responseCode : Number(`${HttpStatus.BAD_REQUEST}00`),
                msg : '사용자 정보가 올바르지 않습니다.'
            })
        }
        // return null;
    }

    async login(user : any){
        const payload = { username : user.username, sub : user.id };
        return {
            access_token : this.jwtService.sign(payload),
        };
    }

    async validateHash(password : string, hash : string ) : Promise<boolean> {
        hash = await hash.replace('$2y$', '$2a$');
        return bcrypt.compare(password, hash || '');
    }
 }
