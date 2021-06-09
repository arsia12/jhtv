import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { ChannelRepositroy, SubscribeRepository } from './channel.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateChannelDTO } from './dto/careate_channel.dto';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { UserService } from '../user/user.service';
import { ChannelEntity } from './channel.entity';
import { UpdateChannelDTO } from './dto/update_channel.dto';
import { UserEntity } from '../user/user.entity';

// responseCode 정리
// 40400 채널이 존재하지 않음.
// 40900 아이디에 채널이 존재하는 경우.
// 40901 삭제 or 수정하려는 채널이 채널 소유자가 아닐경우
// 40902 이미 구독한 채널을 구독하려고 할때
// 40903 구독하지 않은 채널을 구독취소하려고 할때

enum ownerCheck {
  Y,
  N,
}

@Injectable({ scope: Scope.REQUEST })
export class ChannelService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    public readonly channelRepositroy: ChannelRepositroy,
    public readonly subscribeRepository: SubscribeRepository,
    public readonly userService: UserService,
  ) {}

  async getChannelList(page = 1, size = 100): Promise<ChannelEntity[]> {
    const data = await this.channelRepositroy.find({
      skip: (page - 1) * size,
      take: size,
    });
    return data;
  }

  async getChannel(id: number): Promise<ChannelEntity> {
    return await this.channelRepositroy.findOne({
      where: { id: id },
      relations: ['board'],
    });
  }

  async createChannel(body: CreateChannelDTO): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);

    const channel = await this.channelRepositroy.findOne({
      where: { user: user },
    });
    // Todo : 채널명 유니크
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
    const user = await this.userService.getLoginUser(this.request.user['id']);
    
    const channel = await this.channelRepositroy.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리 함수
    await this.channelException(channel, ownerCheck.Y, user);

    await this.channelRepositroy.update(id, body);
    return '채널이 수정되었습니다.';
  }

  async deleteChannel(id: number): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);
    
    const channel = await this.channelRepositroy.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // 예외처리 함수
    await this.channelException(channel, ownerCheck.Y, user);

    await this.channelRepositroy.delete(id);
    return '채널이 삭제되었습니다.';
  }

  async createSubscribe(id: number): Promise<string> {
    // Todo : 로그인 유저 필요 / 로그인 유저 가져오는 함수가 있으면 좋을거 같음.
    // request 유저가 UserEntity인지 확인 필요.
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const channel = await this.channelRepositroy.findOne({
      where: { id: id },
    });

    // 예외처리
    await this.channelException(channel, ownerCheck.N);

    const subscribe_channel = await this.subscribeRepository.findOne({
      where: { channel: channel.id, user: user.id },
    });

    if (subscribe_channel) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}02`),
        msg: '이미 구독한 채널입니다.',
      });
    }

    const subscribe = await this.subscribeRepository.create();

    subscribe.channel = channel;
    subscribe.user = user;

    await this.subscribeRepository.save(subscribe);

    // ****주석은 ManyToMany Save 방법****
    // for (const subscribe_user of channel.subscribe) {
    //   if (subscribe_user.id == user.id) {
    //     throw new GlobalException({
    //       statusCode: HttpStatus.CONFLICT,
    //       responseCode: Number(`${HttpStatus.CONFLICT}02`),
    //       msg: '이미 구독한 채널입니다.',
    //     });
    //   }
    // }
    // channel.subscribe.push(user);
    // await this.channelRepositroy.save(channel);

    return '구독이 추가되었습니다.';
  }

  async deleteSubscribe(id: number): Promise<string> {
    const user = await this.userService.getLoginUser(this.request.user['id']);
    const channel = await this.channelRepositroy.findOne({
      where: { id: id },
    });

    // 예외처리
    await this.channelException(channel, ownerCheck.N);

    const subscribe_channel = await this.subscribeRepository.findOne({
      where: { channel: channel.id, user: user.id },
    });

    if (!subscribe_channel) {
      throw new GlobalException({
        statusCode: HttpStatus.CONFLICT,
        responseCode: Number(`${HttpStatus.CONFLICT}03`),
        msg: '구독한 채널이 아닙니다.',
      });
    }

    await this.subscribeRepository.delete(subscribe_channel.id);

    return '구독을 취소하였습니다.';
  }

  async channelException(channel: ChannelEntity, owner: number, user?: UserEntity): Promise<void> {
    // 채널이 존재하지 않을 경우 예외 처리
    if (!channel) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}00`),
        msg: '채널이 존재하지 않습니다.',
      });
    }

    // 채널 소유자가 아닐 경우 예외 처리
    if (owner == 0) {
      if (channel.user.id != user.id) {
        throw new GlobalException({
          statusCode: HttpStatus.CONFLICT,
          responseCode: Number(`${HttpStatus.CONFLICT}01`),
          msg: '채널의 소유자만 가능합니다.',
        });
      }
    }
  }
}
