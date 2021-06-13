import { HttpStatus, Injectable } from '@nestjs/common';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  //회원가입
  async createUser(body: CreateUserDto) {
    await this.userRepository.save(this.userRepository.create(body));
  }

  //로그인시 아이디 유무 확인
  async existUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username }, select: ['id', 'username', 'password'] });
  }

  async getLoginUser(id: number) {
    return await this.userRepository.findOne(id);
  }

  async regUsernameCheck(username : string){
    const check = await this.userRepository.find({
      where : { username : username },
    });
    if(check){
      throw new GlobalException({
        statusCode : HttpStatus.CONFLICT,
        responseCode : Number(`${HttpStatus.CONFLICT}30`),
        msg : '이미 존재하는 ID 입니다.',
      });
    }
  }

  async regEmailCheck(email : string){
    const check = await this.userRepository.find({
      where : { email : email },
    });
    if(check){
      throw new GlobalException({
        statusCode : HttpStatus.CONFLICT,
        responseCode : Number(`${HttpStatus.CONFLICT}31`),
        msg : '이미 존재하는 이메일 입니다.',
      });
    }
  }

  async regPhoneCheck(phone : string){
    const check = await this.userRepository.find({
      where : { phone : phone },
    });
    if(check){
      throw new GlobalException({
        statusCode : HttpStatus.CONFLICT,
        responseCode : Number(`${HttpStatus.CONFLICT}32`),
        msg : '이미 존재하는 전화번호 입니다.',
      });
    }
  }
}
