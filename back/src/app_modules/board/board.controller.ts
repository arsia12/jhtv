import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create_board.dto';
import { SwaggerParameter } from 'src/common/decorators/parameter.decotrator';
import { SwaggerPagination } from 'src/common/decorators/pagination.decorator';

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

  @SwaggerDecorators('게시글 삭제')
  @SwaggerParameter('Board PK')
  @Delete(':id')
  async deleteBoard(@Param('id') id: number) {
    const data = await this.boardService.deleteBoard(id);
    return this.makeResponse({ data });
  }
}
