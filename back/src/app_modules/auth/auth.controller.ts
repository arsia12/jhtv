import { Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user_login.dto';

@ApiTags('auth')
@RouterTag('auth')
export class AuthController {
    constructor(
        private readonly authSevice : AuthService
    ){}

    @ApiOperation({ summary : '로그인' })
    @Post('login')
    async login(@Body() body : UserLoginDto){
        const user = await this.authSevice.validateUser(body);
        return this.authSevice.login(user);
    }
}
