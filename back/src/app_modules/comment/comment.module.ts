import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepositroy } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepositroy])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
