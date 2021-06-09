import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { BoardService } from '../board/board.service';
import { UserService } from '../user/user.service';
import { CommentRepositroy, LikeCommentRepository } from './comment.repository';
import { CreateCommentlDTO } from './dto/create_comment.dto';
import { CommentEntity } from './comment.entity';
import { UpdateCommentDTO } from './dto/update_comment.dto';

enum ownerCheck {
  Y,
  N,
}

@Injectable({ scope: Scope.REQUEST })
export class CommentService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly commentRepository: CommentRepositroy,
    public readonly likeCommentRepository: LikeCommentRepository,
    public readonly boardService: BoardService,
    public readonly userService: UserService,
  ) {}

  async getCommentByBoard(
    id: number,
    page = 1,
    size = 100,
  ): Promise<CommentEntity[]> {
    const board = await this.boardService.getBoard(id);

    const comment = await this.commentRepository.find({
      where: { board: board.id },
      skip: page,
      take: size,
      relations: ['user'],
    });

    return comment;
  }

  async createComment(id: number, body: CreateCommentlDTO): Promise<string> {
    // Todo : 접속 유저로 변경
    const user = await this.userService.getTestUser(2);

    const board = await this.boardService.getBoard(id);

    const comment = await this.commentRepository.create(body);

    comment.board = board;
    comment.user = user;

    await this.commentRepository.save(comment);
    return '댓글 등록에 성공하였습니다.';
  }

  async updateComment(id: number, body: UpdateCommentDTO): Promise<string> {
    
    const comment = await this.commentRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리
    await this.commentException(comment, ownerCheck.Y);
    await this.commentRepository.update(id, body);
    return '댓글이 수정되었습니다.'
  }

  async deleteComment(id: number): Promise<string> {
    const comment = await this.commentRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리
    await this.commentException(comment, ownerCheck.Y);
    await this.commentRepository.delete(id);
    return '댓글이 삭제되었습니다.';
  }


  async createLikeComment(id: number): Promise<string> {
    const user = await this.userService.getTestUser(2);
    const comment = await this.commentRepository.findOne(id);

    await this.commentException(comment, ownerCheck.N);

    const like_comment = await this.likeCommentRepository.findOne({
      where: { comment: comment.id, user: user.id },
    });

    if (like_comment) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}22`),
        msg: '이미 좋아요한 개시글입니다.',
      });
    }

    const like = await this.likeCommentRepository.create();

    like.comment = comment;
    like.user = user;

    await this.likeCommentRepository.save(like);
    return '댓글을 좋아합니다.'
  }

  async deleteLikeComment(id: number): Promise<string> {    
    const user = await this.userService.getTestUser(2);
    const comment = await this.commentRepository.findOne(id);

    await this.commentException(comment, ownerCheck.N);

    const like_comment = await this.likeCommentRepository.findOne({
      where: { comment: comment.id, user: user.id },
    });

    if (!like_comment) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}13`),
        msg: '좋아요를 하지 않은 댓글입니다.',
      });
    }

    await this.likeCommentRepository.delete(like_comment.id);
    return '댓글 좋아요를 취소했습니다.'
  }

  async commentException(comment: CommentEntity, owner: number): Promise<void> {
    // Todo : 로그인 유저 필요
    const user = await this.userService.getTestUser(2);

    // 댓글이 존재하지 않을 경우 예외 처리
    if (!comment) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}20`),
        msg: '댓글이 존재하지 않습니다.',
      });
    }

    // 작성자가 아닐 경우 예외 처리
    if (owner == 0) {
      if (comment.user.id != user.id) {
        throw new GlobalException({
          statusCode: HttpStatus.CONFLICT,
          responseCode: Number(`${HttpStatus.CONFLICT}20`),
          msg: '작성자만 가능합니다.',
        });
      }
    }
  }
}
