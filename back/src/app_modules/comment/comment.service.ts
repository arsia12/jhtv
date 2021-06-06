import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CommentRepositroy } from './comment.repository';
import { CreateCommentlDTO } from './dto/create_comment.dto';

@Injectable({ scope: Scope.REQUEST })
export class CommentService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        public readonly commentRepository: CommentRepositroy
    ){}

    async createComment(id:number, body:CreateCommentlDTO){

    }
}
