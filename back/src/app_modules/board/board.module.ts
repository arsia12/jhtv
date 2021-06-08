import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepositroy } from './board.repository';
import { ChannelRepositroy } from '../channel/channel.repository';
import { ChannelModule } from '../channel/channel.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepositroy, ChannelRepositroy]),
    ChannelModule,
    UserModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
