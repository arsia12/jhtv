import { Controller } from '@nestjs/common';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';

@RouterTag('user')
export class UserController {}
