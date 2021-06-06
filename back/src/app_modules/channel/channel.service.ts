import { Injectable, Scope, Inject } from '@nestjs/common';
import { ChannelRepositroy } from './channel.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateChannelDTO } from './dto/careate_channel.dto';

@Injectable({ scope: Scope.REQUEST })
export class ChannelService {
    constructor(
        @Inject(REQUEST) private readonly request: Request, 
        public readonly channelRepositroy: ChannelRepositroy
    ){}

    async getChannelList(page=1, size=100){
        return await this.channelRepositroy.find({
            skip: page,
            take: size,
        });
    }

    async getChannel(id: number){
        return await this.channelRepositroy.findOne({
            where: {id: id},
            relations: ['board'],
        });
    }
    async createChannel(body: CreateChannelDTO) {
        //await this.channelRepositroy.create(body);
        // Todo : OneToOne FK 필요
        // await this.channelRepositroy.create(body);
        //return '채널 등록에 성공했습니다.';
    }
}
