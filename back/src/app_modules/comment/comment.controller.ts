import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AbstractController } from 'src/common/abstract_controller';
import { CommentService } from './comment.service';
import { CreateCommentlDTO } from './dto/create_comment.dto';

@Controller('comment')
export class CommentController extends AbstractController {
    constructor(private readonly commentService: CommentService){
        super();
    }

    @Get('board/:id')
    async getCommentByBoard(){
        
    }
    
    @Get('user/:id')
    async getCommentByUser() {

    }

    @Post(':id')
    async createComment(@Param('id') id: number, @Body() body: CreateCommentlDTO) {
        const data = await this.commentService.createComment(id, body)
    }
}
