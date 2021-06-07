import { Controller, Post, Body, Get } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create_board.dto';

@RouterTag('board')
export class BoardController extends AbstractController {
  constructor(private readonly boardService: BoardService) {
    super();
  }


  @SwaggerDecorators('게시글 작성')
  @Post()
  async createBoard(@Body() body: CreateBoardDTO) {
    const data = await this.boardService.createBoard(body);
    return this.makeResponse({ data });
  }
}
