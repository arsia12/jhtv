import { Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@RouterTag('user')
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
