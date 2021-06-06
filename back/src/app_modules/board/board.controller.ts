import { Controller, Post, Body, Get } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { BoardService } from './board.service';
import { async } from 'rxjs';
import { CreateBoardDTO } from './dto/create_board.dto';

@Controller('board')
export class BoardController extends AbstractController {
  constructor(private readonly boardService: BoardService) {
    super();
  }


  @Post()
  async createBoard(@Body() body: CreateBoardDTO) {
    const data = await this.boardService.createBoard(body);
    return this.makeResponse({ data });
  }
}
