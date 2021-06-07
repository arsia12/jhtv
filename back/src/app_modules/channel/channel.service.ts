import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { ChannelRepositroy } from './channel.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateChannelDTO } from './dto/careate_channel.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { UserService } from '../user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class ChannelService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly channelRepositroy: ChannelRepositroy,
    public readonly userService: UserService,
  ) {}

  async getChannelList(page = 1, size = 100) {
    return await this.channelRepositroy.find({
      skip: page,
      take: size,
    });
  }

  async getChannel(id: number) {
    return await this.channelRepositroy.findOne({
      where: { id: id },
      relations: ['board'],
    });
  }
  async createChannel(body: CreateChannelDTO) {
    // 로그인한 유저 pk (현재는 Test 유저)
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

    // Todo: 채널 생성

    const new_channel = await this.channelRepositroy.create(body);
    new_channel.user = user;
    await this.channelRepositroy.save(new_channel);

    return '채널 등록에 성공했습니다.';
  }

  async getChannelByUser(id: number) {
    return await this.channelRepositroy.findOne({
      where: { user: id },
      relations: ['user'],
    });
  }
}
