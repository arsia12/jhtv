import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { BoardRepositroy, LikeBoardRepository } from './board.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateBoardDTO } from './dto/create_board.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { ChannelService } from '../channel/channel.service';
import { BoardEntity } from './board.entity';
import { UserService } from '../user/user.service';
import { UpdateBoardDTO } from './dto/update_board.dto';
import { UserEntity } from '../user/user.entity';
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
    public readonly likeBoardRepository: LikeBoardRepository,
    public readonly channelService: ChannelService,
    public readonly userService: UserService,
  ) {}

  //전체 게시글 조회
  async getBoardList(page = 1, size = 100) {
    const user_id = this.request.user['id'] ? this.request.user['id'] : 0;
    const data = await this.boardRepository.find({
      skip: (page - 1) * size,
      take: size,
    });
    for(const sub of data) {
      sub['isLike'] = false;
      if(user_id) {
        const isSub = await this.likeBoardRepository.findOne({
          where : { board : sub.id, user : user_id}
        });
        if(isSub) {
          sub['isLike'] = true;
        }
      }
    }
    return data;
  }

  async getBoardByChannel(
    id: number,
    page = 1,
    size = 100,
  ): Promise<BoardEntity[]> {
    const user_id = this.request.user['id'] ? this.request.user['id'] : 0;
    const channel = await this.channelService.getChannel(id);
    // 채널에 대한 예외처리
    await this.channelService.channelException(channel, ownerCheck.N);

    const board = await this.boardRepository.find({
      where: { channel: channel.id },
      skip: (page - 1) * size,
      take: size,
      order: { id: 'DESC' },
    });
    for(const sub of board) {
      sub['isLike'] = false;
      if(user_id) {
        const isSub = await this.likeBoardRepository.findOne({
          where : { board : sub.id, user : user_id}
        });
        if(isSub) {
          sub['isLike'] = true;
        }
      }
    }
    return board;
  }

  async createBoard(body: CreateBoardDTO): Promise<string> {
    // Todo : 로그인 아이디 필요 (현재 test용 아이디)
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const data = await this.channelService.getChannelByUser(user.id);

    // 채널 예외처리
    await this.channelService.channelException(data, ownerCheck.Y, user);

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
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const board = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    await this.boardException(board, ownerCheck.Y, user);

    await this.boardRepository.update(id, body);

    return '게시글이 수정되었습니다.';
  }

  async deleteBoard(id: number): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);
    
    const board = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리 함수
    await this.boardException(board, ownerCheck.Y, user);

    await this.boardRepository.delete(id);

    return '게시글이 삭제되었습니다.';
  }

  async createLikeBoard(id: number): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const board = await this.boardRepository.findOne(id);

    await this.boardException(board, ownerCheck.N);

    const like_board = await this.likeBoardRepository.findOne({
      where: { board: board.id, user: user.id },
    });

    if (like_board) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}12`),
        msg: '이미 좋아요한 게시글입니다.',
      });
    }

    const like = await this.likeBoardRepository.create();

    like.board = board;
    like.user = user;

    await this.likeBoardRepository.save(like);

    return '게시글을 좋아요 했습니다.';
  }

  async deleteLikeBoard(id: number): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const board = await this.boardRepository.findOne(id);

    await this.boardException(board, ownerCheck.N);

    const like_board = await this.likeBoardRepository.findOne({
      where: { board: board.id, user: user.id },
    });

    if (!like_board) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}13`),
        msg: '좋아요를 하지 않은 게시글입니다.',
      });
    }

    await this.likeBoardRepository.delete(like_board.id);

    return '게시글 좋아요를 취소했습니다.';
  }

  // 사용하는 곳 2곳
  async getBoard(id: number): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne(id);

    // 예외처리 함수
    await this.boardException(board, ownerCheck.N);

    return board;
  }

  async boardException(board: BoardEntity, owner: number, user?: UserEntity): Promise<void> {
    
    // 게시글 존재 예외처리
    if (!board) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}01`),
        msg: '채널이 존재하지 않습니다.',
      });
    }
    // 글쓴이 예외처리
    if (owner == 0) {
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
