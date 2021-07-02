import { HttpStatus, Injectable } from '@nestjs/common';
import { isEmail, IsEmail } from 'class-validator';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { CreateUserDto } from './dto/createUser.dto';
import { FindPasswordDto } from '../auth/dto/findPassword.dto';
import { UserRepository } from './user.repository';
import { updatePasswordDto } from '../auth/dto/updatePassword.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

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

  //유저 아이디 찾기
  async findUsername(email : string) {
    console.log(email);
    const user = await this.userRepository.findOne({
      where : {email : email},
    });
    console.log(user);
    if(!user) {
      throw new GlobalException({
        statusCode : HttpStatus.NOT_FOUND,
        responseCode : Number(`${HttpStatus.NOT_FOUND}30`),
        msg : '해당 정보의 유저가 존재하지 않습니다.'
      })
    }
    return user.username;
  }

  async findPassword(body : FindPasswordDto) {
    const user = await this.userRepository.findOne({
      where : body,
      select : [ 'id', 'username', 'password'],
    });
    if(!user) {
      throw new GlobalException({
        statusCode : HttpStatus.NOT_FOUND,
        responseCode : Number(`${HttpStatus.NOT_FOUND}31`),
        msg : '해당 정보의 유저가 존재하지 않습니다. 다시 한번 확인해 주세요.'
      })
    }
    return user;
  }

  async updatePassword(body : updatePasswordDto) {
    const user = await this.userRepository.findOne(body.id);
    if(!user) { 
      throw new GlobalException({
        statusCode : HttpStatus.NOT_FOUND,
        responseCode : Number(`${HttpStatus.NOT_FOUND}32`),
        msg : '해당 정보의 유저가 존재하지 않습니다. 다시 한번 확인해 주세요.'
      })
    }
    user.password = body.password;
    try {
      await this.userRepository.save(user);
    }catch(e) {
      throw new GlobalException ({
        statusCode : HttpStatus.BAD_REQUEST,
        responseCode : Number(`${HttpStatus.BAD_REQUEST}30`),
        msg : '잘못된 요청입니다. 다시 시도해 주세요'
      })
    }
  }


  //회원정보 수정
  async updateUser(id : number, body : UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where : {id : id}, 
      select : ['password']
    });
    console.log(user);
    
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
