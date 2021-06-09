import { Post, Body, Get, Param, Query, Delete, Put } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create_board.dto';
import { SwaggerParameter } from 'src/common/decorators/parameter.decotrator';
import { SwaggerPagination } from 'src/common/decorators/pagination.decorator';
import { UpdateBoardDTO } from './dto/update_board.dto';

@RouterTag('board')
export class BoardController extends AbstractController {
  constructor(private readonly boardService: BoardService) {
    super();
  }

  @SwaggerDecorators('채널 게시글')
  @SwaggerParameter('Channel PK')
  @SwaggerPagination(1, 100)
  @Get(':id')
  async getBoardByChannel(@Param('id') id: number, @Query() query) {
    const data = await this.boardService.getBoardByChannel(
      id,
      query.page,
      query.size,
    );
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 디테일')
  @SwaggerParameter('Board PK')
  @Get('detail/:id')
  async getBoard(@Param('id') id: number) {
    const data = await this.boardService.getBoard(id);
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 작성')
  @Post()
  async createBoard(@Body() body: CreateBoardDTO) {
    const data = await this.boardService.createBoard(body);
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 수정')
  @SwaggerParameter('Board PK')
  @Put(':id')
  async updateBoard(@Param('id') id: number, @Body() body: UpdateBoardDTO) {
    const data = await this.boardService.updateBoard(id, body);
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 삭제')
  @SwaggerParameter('Board PK')
  @Delete(':id')
  async deleteBoard(@Param('id') id: number) {
    const data = await this.boardService.deleteBoard(id);
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 좋아요')
  @SwaggerParameter('Board PK')
  @Post('like/:id')
  async createLikeBoard(@Param('id') id: number) {
    const data = await this.boardService.createLikeBoard(id);
    return this.makeResponse({ data });
  }

  @SwaggerDecorators('게시글 좋아요 취소')
  @SwaggerParameter('Board PK')
  @Delete('like/:id')
  async deleteLikeBoard(@Param('id') id: number) {
    const data = await this.boardService.deleteLikeBoard(id);
    return this.makeResponse({ data })
  }
}
