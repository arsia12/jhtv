import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepositroy extends Repository<CommentEntity> {}
