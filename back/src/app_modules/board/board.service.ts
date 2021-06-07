import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { BoardRepositroy } from './board.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateBoardDTO } from './dto/create_board.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { ChannelService } from '../channel/channel.service';

// Response Code List
// 40400 Channel Does Not Exist

@Injectable({ scope: Scope.REQUEST })
export class BoardService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly boardRepository: BoardRepositroy,
    public readonly channelService: ChannelService,
  ) {}

  async createBoard(body: CreateBoardDTO) {
    // test용 아이디
    const user = 2;
    const data = await this.channelService.getChannelByUser(user);
    
    // 채널이 없는 경우 예외처리
    if (!data) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}00`),
        msg: '채널이 존재하지 않습니다.',
      });
    }

    const board = await this.boardRepository.create(body);
    board.user = data.user;
    board.channel = data;
    await this.boardRepository.save(board);
    return '게시글 등록에 성공했습니다.';
  }

  async getBoard(id: number) {
      return await this.boardRepository.findOne(id);
  }
}
