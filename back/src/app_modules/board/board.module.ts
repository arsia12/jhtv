import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepositroy } from './board.repository';
import { ChannelRepositroy } from '../channel/channel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepositroy, ChannelRepositroy])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
