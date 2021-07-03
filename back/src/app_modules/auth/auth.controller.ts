import { Body, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user_login.dto';
import { AbstractController } from 'src/common/abstract_controller';
import { SwaggerDecorators, SwaggerUserDecorators } from 'src/common/decorators/swagger.decorator';
import { UserService } from '../user/user.service';
import { FindPasswordDto } from './dto/findPassword.dto';
import { updatePasswordDto } from './dto/updatePassword.dto';

@RouterTag('auth')
export class AuthController extends AbstractController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService : UserService,
    ) {
    super();
  }

  // Todo : 페이로드 유저정보도 넣어주세요
  @SwaggerUserDecorators('로그인')
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.validateUser(body);
    return this.makeResponse({ data })
  }

  @SwaggerUserDecorators('아이디 찾기')
  @Post('username/:email')
  async findUsername(@Param('email') email : string) {
    const result = await this.userService.findUsername(email);
    return result;
  }

  @SwaggerUserDecorators('비밀번호 찾기')
  @Post('password')
  async findPassword(@Body() body : FindPasswordDto) {
    const data = await this.authService.findPassword(body);
    return this.makeResponse({data});
  }

  @SwaggerDecorators('비밀번호 찾기-> 비밀번호 변경',
  '비밀번호 찾기에서 나온 아이디(number)를 이용하여 비밀번호 변경 연동')
  @Put('password')
  async updatePassword(@Body() body : updatePasswordDto) {
    const data = await this.authService.updatePassword(body);
    return this.makeResponse({
      statusCode : HttpStatus.OK,
      responseCode : Number(`${HttpStatus.OK}00`),
      data : '비밀번호가 변경되었습니다.',
    });
  }
}
