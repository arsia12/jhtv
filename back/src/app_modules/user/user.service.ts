import { HttpStatus, Injectable } from '@nestjs/common';
import { isEmail, IsEmail } from 'class-validator';
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
    if(username.length >= 3 && username.length <= 15) {
      const check = await this.userRepository.findOne({
        where : { username : username },
        select : ['username'],
      });
      if(check){
        throw new GlobalException({
          statusCode : HttpStatus.CONFLICT,
          responseCode : Number(`${HttpStatus.CONFLICT}30`),
          msg : '이미 존재하는 ID 입니다.',
        });
      }
      return check;
    }
    else {
      throw new GlobalException({
        statusCode : HttpStatus.BAD_REQUEST,
        responseCode : Number(`${HttpStatus.BAD_REQUEST}30`),
        msg : '아이디는 3자 이상 15자 이하의 영문으로만 가입 가능합니다.',
      })
    }
  }

  async regEmailCheck(email : string){
    if(isEmail(email)){
      const check = await this.userRepository.findOne({
        where : { email : email },
      });
      if(check){
        throw new GlobalException({
          statusCode : HttpStatus.CONFLICT,
          responseCode : Number(`${HttpStatus.CONFLICT}31`),
          msg : '이미 존재하는 이메일 입니다.',
        });
      }
      return check;
    }
    else{
      throw new GlobalException({
        statusCode : HttpStatus.BAD_REQUEST,
        responseCode : Number(`${HttpStatus.BAD_REQUEST}31`),
        msg : '이메일 형식이 아닙니다.',
      })
    }
  }

  async regPhoneCheck(phone : string){
    if(phone.length == 11) { 
      const check = await this.userRepository.findOne({
        where : { phone : phone},
      });
      if(check){
        throw new GlobalException({
          statusCode : HttpStatus.CONFLICT,
          responseCode : Number(`${HttpStatus.CONFLICT}32`),
          msg : '이미 존재하는 전화번호 입니다.',
        });
      }
      return check;
    }
    else {
      throw new GlobalException({
        statusCode : HttpStatus.BAD_REQUEST,
        responseCode : Number(`${HttpStatus.BAD_REQUEST}32`),
        msg : '올바른 전화번호를 입력해 주세요.',
      })
    }
  }

}
