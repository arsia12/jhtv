import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { ChannelRepositroy } from './channel.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateChannelDTO } from './dto/careate_channel.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { UserService } from '../user/user.service';
import { ChannelEntity } from './channel.entity';
import { UpdateChannelDTO } from './dto/update_channel.dto';

// responseCode 정리
// 40400 채널이 존재하지 않음.
// 40900 아이디에 채널이 존재하는 경우.
// 40901 삭제 or 수정하려는 채널이 채널 소유자가 아닐경우

@Injectable({ scope: Scope.REQUEST })
export class ChannelService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly channelRepositroy: ChannelRepositroy,
    public readonly userService: UserService,
  ) {}

  async getChannelList(page = 1, size = 100): Promise<ChannelEntity[]> {
    return await this.channelRepositroy.find({
      skip: page,
      take: size,
    });
  }

  async getChannel(id: number): Promise<ChannelEntity> {
    return await this.channelRepositroy.findOne({
      where: { id: id },
      relations: ['board'],
    });
  }
  async createChannel(body: CreateChannelDTO): Promise<string> {
    // Todo : 로그인한 유저 pk (현재는 Test 유저)
    const user = await this.userService.getTestUser(2);

    const channel = await this.channelRepositroy.findOne({
      where: { user: user },
    });

    if (channel) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}00`),
        msg: '채널은 1개 이상 만들 수 없습니다.',
      });
    }

    const new_channel = await this.channelRepositroy.create(body);
    new_channel.user = user;
    await this.channelRepositroy.save(new_channel);

    return '채널 등록에 성공했습니다.';
  }

  async getChannelByUser(id: number): Promise<ChannelEntity> {
    return await this.channelRepositroy.findOne({
      where: { user: id },
      relations: ['user'],
    });
  }

  async updateChannel(id: number, body: UpdateChannelDTO): Promise<string> {
    const channel = await this.channelRepositroy.findOne({
      where: {id: id},
      relations: ['user']
    });
    
    // 예외처리 함수
    await this.isChannel(channel);
    
    await this.channelRepositroy.update(id, body);
    return '채널이 수정되었습니다.'
    
  }

  async deleteChannel(id: number): Promise<string> {
    const channel = await this.channelRepositroy.findOne({
      where: {id: id},
      relations: ['user']
    });
    
    // 예외처리 함수
    await this.isChannel(channel);
    
    await this.channelRepositroy.delete(id);
    return '채널이 삭제되었습니다.';
  }

  async isChannel(channel: ChannelEntity): Promise<any>{
    // 함수 타입을 Boolean 으로 해서 ture로 넘길지,
    // any로 해서 return 을 넘기지 않을지 생각필요
    // return이 필요하지 않은 함수로 생각해서 any로 넘김.

    // Todo : 로그인 유저 필요 
    const user = await this.userService.getTestUser(2);
    
    // 채널이 존재하지 않을 경우 예외 처리
    if (!channel) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}00`),
        msg: '채널이 존재하지 않습니다.'
      })
    }

    // 채널 소유자가 아닐 경우 예외 처리
    if(channel.user.id != user.id){
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}01`),
        msg: '채널의 소유자만 가능합니다.'
      })
    }
  }
}
