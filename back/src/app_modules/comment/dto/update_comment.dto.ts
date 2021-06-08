import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentlDTO } from './create_comment.dto';

export class UpdateCommentDTO extends PartialType(CreateCommentlDTO) {}