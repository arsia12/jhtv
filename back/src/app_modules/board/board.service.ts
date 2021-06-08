import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { BoardRepositroy } from './board.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateBoardDTO } from './dto/create_board.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { ChannelService } from '../channel/channel.service';
import { BoardEntity } from './board.entity';
import { UserService } from '../user/user.service';
import { UpdateBoardDTO } from './dto/update_board.dto';
// Response Code List
// 40400 채널이 존재하지 않음.
// 40410 게시판이 존재하지 않음.
// 40910 게시글의 작성자가 아님.

// Todo: enum 묶을 예정
enum ownerCheck {
  Y,
  N,
}

@Injectable({ scope: Scope.REQUEST })
export class BoardService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly boardRepository: BoardRepositroy,
    public readonly channelService: ChannelService,
    public readonly userService: UserService,
  ) {}

  async getBoardByChannel(
    id: number,
    page = 1,
    size = 100,
  ): Promise<BoardEntity[]> {
    const channel = await this.channelService.getChannel(id);

    // 채널에 대한 예외처리
    await this.channelService.channelException(channel, ownerCheck.N);

    const board = await this.boardRepository.find({
      where: { channel: channel.id },
      skip: page,
      take: size,
      order: { id: 'DESC' },
    });

    return board;
  }
  async createBoard(body: CreateBoardDTO): Promise<string> {
    // Todo : 로그인 아이디 필요 (현재 test용 아이디)
    const user = await this.userService.getTestUser(2);
    const data = await this.channelService.getChannelByUser(user.id);

    // 채널 예외처리
    await this.channelService.channelException(data, ownerCheck.Y);

    // Board Entity 객체 Create
    const board = await this.boardRepository.create(body);

    // 생성한 객체에 user, channel 객체 추가
    board.user = data.user;
    board.channel = data;

    // DB Save
    await this.boardRepository.save(board);
    return '게시글 등록에 성공했습니다.';
  }

  async updateBoard(id: number, body: UpdateBoardDTO) {
    const board = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    await this.barodException(board, ownerCheck.Y);

    await this.boardRepository.update(id, body);

    return '게시글이 수정되었습니다.';
  }

  async deleteBoard(id: number): Promise<string> {
    const board = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리 함수
    await this.barodException(board, ownerCheck.Y);

    await this.boardRepository.delete(id);

    return '게시글이 삭제되었습니다.';
  }

  // 사용하는 곳 2곳
  async getBoard(id: number): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne(id);

    // 예외처리 함수
    await this.barodException(board, ownerCheck.N);

    return board;
  }

  async barodException(board: BoardEntity, owner): Promise<void> {
    // Todo : 로그인 유저 처리
    const user = await this.userService.getTestUser(2);

    // 게시글 존재 예외처리
    if (!board) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}01`),
        msg: '채널이 존재하지 않습니다.',
      });
    }
    // 글쓴이 예외처리
    if (owner == 1) {
      if (board.user.id != user.id) {
        throw new GlobalException({
          statusCode: HttpStatus.CONFLICT,
          responseCode: Number(`${HttpStatus.CONFLICT}10`),
          msg: '작성자만 가능합니다.',
        });
      }
    }
  }
}
