import { Get, Post, Param, Body } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { SwaggerParameter } from 'src/common/decorators/parameter.decotrator';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { CommentService } from './comment.service';
import { CreateCommentlDTO } from './dto/create_comment.dto';

@RouterTag('comment')
export class CommentController extends AbstractController {
  constructor(private readonly commentService: CommentService) {
    super();
  }

  @SwaggerDecorators('미완성')
  @SwaggerParameter('Board PK')
  @Get('board/:id')
  async getCommentByBoard() {}

  @SwaggerDecorators('미완성')
  @SwaggerParameter('User PK')
  @Get('user/:id')
  async getCommentByUser() {}

  @SwaggerDecorators('댓글 작성')
  @SwaggerParameter('Board PK')
  @Post(':id')
  async createComment(
    @Param('id') id: number,
    @Body() body: CreateCommentlDTO,
  ) {
    const data = await this.commentService.createComment(id, body);
    return this.makeResponse({ data });
  }
}
