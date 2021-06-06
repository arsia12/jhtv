import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AbstractController } from 'src/common/abstract_controller';
import { CreateChannelDTO } from './dto/careate_channel.dto';

@Controller('channel')
export class ChannelController extends AbstractController {
  constructor(private readonly channelService: ChannelService) {
    super();
  }

  @Get()
  async getChannelList(@Query() query) {
    const data = await this.channelService.getChannelList(
      query.page,
      query.size,
    );
    return this.makeResponse({ data });
  }

  @Get(':id')
  async getChannel(@Param('id') id: number) {
      const data = await this.channelService.getChannel(id)
      return this.makeResponse({ data })
  }

  @Post()
  async createChannel(@Body() body:CreateChannelDTO) {
      const data = await this.channelService.createChannel(body)
  }
}
