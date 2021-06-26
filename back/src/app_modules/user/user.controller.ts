import { Body, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerUserDecorators } from 'src/common/decorators/swagger.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@RouterTag('user')
export class UserController extends AbstractController {
  constructor(private readonly userService: UserService) {
    super();
  }
  @SwaggerUserDecorators('회원 가입')
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.createUser(body);
  }

  @SwaggerUserDecorators('아이디 중복 체크')
  @Post('username/:username')
  async regUsernameCheck(@Param('username') username: string){
    const result = await this.userService.regUsernameCheck(username);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}01`),
        data : '사용 가능한 아이디 입니다.',
      })
    }
  }

  @SwaggerUserDecorators('이메일 중복 체크')
  @Post('email/:email')
  async regEmailCheck(@Param('email') email: string){
    const result = await this.userService.regEmailCheck(email);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}02`),
        data : '사용 가능한 이메일 입니다.',
      })
    }
  }

  @SwaggerUserDecorators('전화번호 중복 체크')
  @Post('phone/:phone')
  async regPhoneCheck(@Param('phone') phone: string){
    const result = await this.userService.regPhoneCheck(phone);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}03`),
        data : '사용 가능한 전화번호 입니다.',
      })
    }
  }
}
