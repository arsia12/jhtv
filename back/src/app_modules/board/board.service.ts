import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { BoardRepositroy } from './board.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateBoardDTO } from './dto/create_board.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { ChannelService } from '../channel/channel.service';
import { BoardEntity } from './board.entity';

// Response Code List
// 40400 Channel Does Not Exist

@Injectable({ scope: Scope.REQUEST })
export class BoardService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly boardRepository: BoardRepositroy,
    public readonly channelService: ChannelService,
  ) {}

  async getBoardByChannel(
    id: number,
    page = 1,
    size = 100,
  ): Promise<BoardEntity[]> {
    // Todo : 채널이 존재하지 않을 경우 예외처리
    const board = await this.boardRepository.find({
      where: { channel: id },
      skip: page,
      take: size,
      order: { id: 'DESC' },
    });
    return board;
  }
  async createBoard(body: CreateBoardDTO): Promise<string> {
    // Todo : 로그인 아이디 필요 (현재 test용 아이디)
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

    // Board Entity 객체 Create 
    const board = await this.boardRepository.create(body);

    // 생성한 객체에 user, channel 객체 추가
    board.user = data.user;
    board.channel = data;

    // DB Save
    await this.boardRepository.save(board);
    return '게시글 등록에 성공했습니다.';
  }

  async deleteBoard(id: number): Promise<string>{
    // Todo : 게시글 존재 예외처리
    // Todo : 글쓴이 예외처리
    return '게시글이 삭제되었습니다.'
  }

  // 사용하는 곳 2곳
  async getBoard(id: number): Promise<BoardEntity> {
    // Todo : 게시글이 존재하지 않을 경우 예외처리
    return await this.boardRepository.findOne(id);
  }
}
