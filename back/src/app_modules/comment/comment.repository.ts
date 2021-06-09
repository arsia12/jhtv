import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity, LikeCommentEntity } from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepositroy extends Repository<CommentEntity> {}

@EntityRepository(LikeCommentEntity)
export class LikeCommentRepository extends Repository<LikeCommentEntity> {}
