import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRepositroy } from './channel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelRepositroy])],
  controllers: [ChannelController],
  providers: [ChannelService]
})
export class ChannelModule {}
