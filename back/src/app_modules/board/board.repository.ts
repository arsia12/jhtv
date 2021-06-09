import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity, LikeBoardEntity } from './board.entity';

@EntityRepository(BoardEntity)
export class BoardRepositroy extends Repository<BoardEntity> {}

@EntityRepository(LikeBoardEntity)
export class LikeBoardRepository extends Repository<LikeBoardEntity> {}
