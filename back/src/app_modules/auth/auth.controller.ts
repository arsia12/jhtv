import { Body, Post } from '@nestjs/common';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user_login.dto';
import { AbstractController } from 'src/common/abstract_controller';
import { SwaggerDecorators, SwaggerUserDecorators } from 'src/common/decorators/swagger.decorator';

@RouterTag('auth')
export class AuthController extends AbstractController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // Todo : 페이로드 유저정보도 넣어주세요
  @SwaggerUserDecorators('로그인')
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.validateUser(body);
    return this.makeResponse({ data })
  }
  
}
