import { Body, Get, Header, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { AuthService, KakaoLogin } from './auth.service';
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
    private readonly kakaoLogin : KakaoLogin,
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

  @Get('kakaoLoginLogic')
  @Header('Content-Type', 'text/html')
  async kakaoLoginLogic(@Res() res) {
    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = '2adebdb0de69ccec299e73ff9f483f02';
    // 카카오 로그인 RedirectURI 등록
    const _redirectUrl = 'http://127.0.0.1:8000/api/auth/kakaoLoginLogicRedirect';
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('kakaoLoginLogicRedirect')
  @Header('Content-Type', 'text/html')
  async kakaoLoginLogicRedirect(@Query() qs) {
    console.log(qs.code);
    const _restApiKey = '2adebdb0de69ccec299e73ff9f483f02';
    const _redirect_uri = 'http://127.0.0.1:8000/api/auth/kakaoLoginLogicRedirect';
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${qs.code}`;
    const _headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    await this.kakaoLogin
      .login(_hostName, _headers)
      .then((e) => {
        console.log(`TOKEN : ${e.data['access_token']}`);
        this.kakaoLogin.setToken(e.data['access_token']);
        return this.makeResponse({
          statusCode : HttpStatus.OK,
          responseCode : Number(`${HttpStatus.OK}02`),
          data : '카카오톡 로그인 성공!',
        })
      })
      .catch((err) => {
        console.log(err);
        return this.makeResponse({
          statusCode : HttpStatus.BAD_REQUEST,
          responseCode : Number(`${HttpStatus.BAD_REQUEST}10`),
          data : '카카오톡 로그인 실패',
        })
      });
  }
  // 카카오 로그인 -> 고급에서 로그아웃 Logout Redirect URI 설정 필요
  @Get('kakaoLogout')
  async kakaoLogout() {
    console.log(`LOGOUT TOKEN : ${this.kakaoLogin.accessToken}`);
    await this.kakaoLogin
      .logout()
      .then((e) => {
        return this.makeResponse({
          statusCode : HttpStatus.OK,
          responseCode : Number(`${HttpStatus.OK}03`),
          data : '카카오톡 로그아웃 성공!',
        })
      })
      .catch((e) => {
        // console.log(e);
        return this.makeResponse({
          statusCode : HttpStatus.BAD_REQUEST,
          responseCode : Number(`${HttpStatus.BAD_REQUEST}11`),
          data : '카카오톡 로그아웃 실패',
        })
      });
    // this.kakaoLogin.completeLogout();
    // return res.send('logout');
  }
}
