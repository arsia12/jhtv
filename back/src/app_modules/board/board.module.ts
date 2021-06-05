import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepositroy } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepositroy])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
