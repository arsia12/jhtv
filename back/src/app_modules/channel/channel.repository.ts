import { EntityRepository, Repository } from 'typeorm';
import { ChannelEntity } from './channel.entity';

@EntityRepository(ChannelEntity)
export class ChannelRepositroy extends Repository<ChannelEntity> {}
