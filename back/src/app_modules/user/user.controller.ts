import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService,){}

    @ApiOperation({
        summary : '회원가입',
        description : '##회원가입'
    })
    @Post()
    async createUser(@Body() body : CreateUserDto){
        await this.userService.createUser(body);
    }
}
