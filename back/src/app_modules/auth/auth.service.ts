import {  HttpService, HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user_login.dto';
import * as bcrypt from 'bcrypt';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { FindPasswordDto } from './dto/findPassword.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
    ) {}

    async validateUser(body : UserLoginDto) : Promise<object>{
        const user = await this.userService.existUsername(body.username);
        
        
        if(!user){
            throw new GlobalException({
                statusCode : HttpStatus.NOT_FOUND,
                responseCode: Number(`${HttpStatus.NOT_FOUND}99`),
                msg : '존재하지 않는 유저 입니다.',
            })
        }
        // 이 부분이 언디파인드 떳던 건 UserEntity password가 select = false
        // existUsername 함수에서 select로 비밀번호 가져오는 것으로 해결

        
        // 비밀번호가 틀려도 토큰이 발급됐던 이유는 validateHash 비동기처리
        const isPasswordValid = await this.validateHash(
            body.password,
            user.password,
        );

        if (isPasswordValid){
            const { password, ...result } = user;
            return await this.login(result);
        } else { 
            throw new GlobalException({
                statusCode : HttpStatus.BAD_REQUEST,
                responseCode: Number(`${HttpStatus.BAD_REQUEST}00`),
                msg : '사용자 정보가 올바르지 않습니다.',
            })
        }
    }

    async login(user : any): Promise<any>{
        const payload = { id : user.id, username : user.username };
        return {
            access_token : await this.jwtService.signAsync(payload),
        };
    }

    async validateHash(password : string, hash : string ): Promise<Boolean> {
        // bcrypt 비동기처리 안됨  
        return await bcrypt.compare(password, hash || '');
    }

    async findPassword(body : FindPasswordDto ) {
        const user = await this.userService.findPassword(body);
        return user.id;
    }

    async updatePassword(body) {
        return await this.userService.updatePassword(body);
    }

 }

 @Injectable()
export class KakaoLogin {
  check: boolean;
  accessToken: string;
  private http: HttpService;
  constructor() {
    this.check = false;
    this.http = new HttpService();
    this.accessToken = '';
  }
  async loginCheck(): Promise<void> {
    this.check = !this.check;
    return;
  }
  async login(url: string, headers: any): Promise<any> {
    return await this.http.post(url, '', { headers }).toPromise();
  }
  async setToken(token: string): Promise<boolean> {
    this.accessToken = token;
    return true;
  }
  async logout(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await this.http.post(_url, '', { headers: _header }).toPromise();
  }

  //다른 로그아웃 유형 테스트
  async completeLogout() : Promise<any> {
    const _restApiKey = '2adebdb0de69ccec299e73ff9f483f02';
    const _redirect_uri = 'http://127.0.0.1:8000/api/auth/kakaoLogout';
    const _url = `https://kauth.kakao.com/oauth/logout?client_id=${_restApiKey}&logout_redirect_uri=${_redirect_uri}`;
    return await this.http.get(_url).toPromise();
  }
}
