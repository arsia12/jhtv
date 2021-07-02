import { Body, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators, SwaggerUserDecorators } from 'src/common/decorators/swagger.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
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

  @UseGuards(AuthGuard)
  @SwaggerDecorators('유저 정보 변경')
  @Put('/:id')
  async updateUser(
    @Req() req: Request,
    @Body() body : UpdateUserDto,
    ) {
    const result = await this.userService.updateUser(req.user['id'] ,body);
  }
}
