import { EntityRepository, Repository } from 'typeorm';
import { ChannelEntity, PremiumEntity, SubscribeEntity } from './channel.entity';

@EntityRepository(ChannelEntity)
export class ChannelRepositroy extends Repository<ChannelEntity> {}

@EntityRepository(SubscribeEntity)
export class SubscribeRepository extends Repository<SubscribeEntity> {}

@EntityRepository(PremiumEntity)
export class PremiumRepository extends Repository<PremiumEntity> {}
