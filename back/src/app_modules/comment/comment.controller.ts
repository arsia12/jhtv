import { Get, Post, Param, Body, Query, Delete, Put, UseGuards } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { SwaggerPagination } from 'src/common/decorators/pagination.decorator';
import { SwaggerParameter } from 'src/common/decorators/parameter.decotrator';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { CommentService } from './comment.service';
import { CreateCommentlDTO } from './dto/create_comment.dto';
import { UpdateCommentDTO } from './dto/update_comment.dto';
import { AuthGuardWithAnonymous } from 'src/common/guards/auth_anonymous.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

@RouterTag('comment')
export class CommentController extends AbstractController {
  constructor(private readonly commentService: CommentService) {
    super();
  }

  @UseGuards(AuthGuardWithAnonymous)
  @SwaggerDecorators('게시글 댓글 리스트')
  @SwaggerParameter('Board PK')
  @SwaggerPagination(1, 100)
  @Get('board/:id')
  async getCommentByBoard(@Param('id') id: number, @Query() query) {
    const data = await this.commentService.getCommentByBoard(
      id,
      query.page,
      query.size,
    );
    return this.makeResponse({ data });
  }

  
  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @SwaggerDecorators('댓글 수정')
  @SwaggerParameter('Comment PK')
  @Put(':id')
  async updateComment(@Param('id') id: number, @Body() body: UpdateCommentDTO) {
    const data = await this.commentService.updateComment(id, body);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('댓글 삭제')
  @SwaggerParameter('Comment PK')
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    const data = await this.commentService.deleteComment(id);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('댓글 좋아요')
  @SwaggerParameter('Comment PK')
  @Post('like/:id')
  async createLikeComment(@Param('id') id: number) {
    const data = await this.commentService.createLikeComment(id);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('댓글 좋아요 취소')
  @SwaggerParameter('Comment PK')
  @Delete('like/:id')
  async deleteLikeComment(@Param('id') id: number) {
    const data = await this.commentService.deleteLikeComment(id);
    return this.makeResponse({ data })
  }
}
