import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDTO } from './careate_channel.dto';

export class UpdateChannelDTO extends PartialType(CreateChannelDTO) {}