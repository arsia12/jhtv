import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { BoardService } from '../board/board.service';
import { UserService } from '../user/user.service';
import { CommentRepositroy } from './comment.repository';
import { CreateCommentlDTO } from './dto/create_comment.dto';

@Injectable({ scope: Scope.REQUEST })
export class CommentService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly commentRepository: CommentRepositroy,
    public readonly boardService: BoardService,
    public readonly userService: UserService,
  ) {}

  async getCommentByBoard(id: number, page = 1, size = 100) {
    const comment = await this.commentRepository.find({
      where: { board: id },
      skip: page,
      take: size,
      relations: ['user']
    });

    return comment;
  }

  async createComment(id: number, body: CreateCommentlDTO) {
    // board_id, user_id(접속 유저)
    // Test User 사용
    const user = await this.userService.getTestUser(1);
    const board = await this.boardService.getBoard(id);

    if (!board) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}00`),
        msg: '존재하지 않는 게시글입니다.',
      });
    }

    const comment = await this.commentRepository.create(body);
    comment.board = board;
    comment.user = user;
    await this.commentRepository.save(comment);
    return '댓글 등록에 성공하였습니다.';
  }
}
