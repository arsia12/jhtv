import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepositroy } from './comment.repository';
import { BoardModule } from '../board/board.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepositroy]), BoardModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
