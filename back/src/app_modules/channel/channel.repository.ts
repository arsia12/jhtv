import { EntityRepository, Repository } from 'typeorm';
import { ChannelEntity, SubscribeEntity } from './channel.entity';

@EntityRepository(ChannelEntity)
export class ChannelRepositroy extends Repository<ChannelEntity> {}

@EntityRepository(SubscribeEntity)
export class SubscribeRepository extends Repository<SubscribeEntity> {}
