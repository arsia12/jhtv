import { Body, HttpStatus, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators, SwaggerUserDecorators } from 'src/common/decorators/swagger.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import { editFileName, imageFilter, uploadPath } from 'src/utils/file_upload';

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

  @SwaggerUserDecorators('아이디 중복 체크', '테스트 입력시 username 항목 외 모든것 지우고 테스트할것')
  @Post('username')
  async regUsernameCheck(@Body() body: UpdateUserDto){
    const result = await this.userService.regUsernameCheck(body.username);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}01`),
        data : '사용 가능한 아이디 입니다.',
      })
    }
  }

  @SwaggerUserDecorators('이메일 중복 체크', '테스트 입력시 email 항목 외 모든것 지우고 테스트할것')
  @Post('email')
  async regEmailCheck(@Body() body: UpdateUserDto){
    const result = await this.userService.regEmailCheck(body.email);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}02`),
        data : '사용 가능한 이메일 입니다.',
      })
    }
  }

  @SwaggerUserDecorators('전화번호 중복 체크', '테스트 입력시 phone 항목 외 모든것 지우고 테스트할것')
  @Post('phone')
  async regPhoneCheck(@Body() body: UpdateUserDto){
    const result = await this.userService.regPhoneCheck(body.phone);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}03`),
        data : '사용 가능한 전화번호 입니다.',
      })
    }
  }

  @SwaggerUserDecorators('닉네임 중복 체크', '테스트 입력시 nickname 항목 외 모든것 지우고 테스트할것')
  @Post('nickname')
  async regNicknameCheck(@Body() body: UpdateUserDto){
    const result = await this.userService.regPhoneCheck(body.nickname);
    if(!result) {
      return this.makeResponse({
        statusCode : HttpStatus.OK,
        responseCode : Number(`${HttpStatus.OK}04`),
        data : '사용 가능한 닉네임 입니다.',
      })
    }
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('유저 정보 변경')
  @Put('')
  async updateUser(
    @Req() req: Request,
    @Body() body : UpdateUserDto,
    ) {
    const data = await this.userService.updateUser(req.user['id'] ,body);
    return this.makeResponse({data});
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('프로필 사진 등록')
  @Post('/profile')
  @UseInterceptors(
    FileInterceptor('profile',{
      storage : diskStorage({
        destination : uploadPath,
        filename : editFileName,
      }),
      fileFilter : imageFilter,
    })
  )
  async createProfileImg(
    @Req() req: Request,
    @UploadedFile() profile ) {
    const data = await this.userService.createProfileImg(req.user['id'] ,profile);
    return this.makeResponse({data});
  }
}
