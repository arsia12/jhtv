import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { BoardRepositroy } from './board.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateBoardDTO } from './dto/create_board.dto';
import { ChannelRepositroy } from '../channel/channel.repository';
import { GlobalException } from 'src/common/exceptions/global_exception';

// Response Code List
// 40400 Channel Does Not Exist 

@Injectable({ scope: Scope.REQUEST })
export class BoardService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly boardRepository: BoardRepositroy,
    //회원가입 개발완료 전 Test ChannelRepo, Module.Tyoeporm
    public readonly channelRepository: ChannelRepositroy,
  ) {}

  async createBoard(body: CreateBoardDTO){
    const data = await this.channelRepository.findOne({
        where: {user: 2},
        relations: ['user', 'board']
    })

    // 채널이 없는 경우 예외처리
    if(!data){
        throw new GlobalException({
            statusCode:HttpStatus.NOT_FOUND,
            responseCode:Number(`${HttpStatus.NOT_FOUND}00`),
            msg:'채널이 존재하지 않습니다.'
        })
    }
    // 수정예정
    const a = JSON.parse(JSON.stringify(body));
    a.user = 2;
    a.channel = data.id;
    await this.boardRepository.save(a);
    return '게시글 등록에 성공했습니다.';
  }
}
