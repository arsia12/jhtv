import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user_login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authSevice : AuthService
    ){}

    @Post('login')
    async login(@Body() body : UserLoginDto){
        const user = await this.authSevice.validateUser(body);
        // return this.authSevice.login(user);
    }
}
