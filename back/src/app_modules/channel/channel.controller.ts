import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AbstractController } from 'src/common/abstract_controller';
import { CreateChannelDTO } from './dto/careate_channel.dto';
import { SwaggerDecorators } from '../../common/decorators/swagger.decorator';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerPagination } from 'src/common/decorators/pagination.decorator';
import { SwaggerParameter } from 'src/common/decorators/parameter.decotrator';
import { UpdateChannelDTO } from './dto/update_channel.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthGuardWithAnonymous } from 'src/common/guards/auth_anonymous.guard';

@RouterTag('channel')
export class ChannelController extends AbstractController {
  constructor(private readonly channelService: ChannelService) {
    super();
  }

  @UseGuards(AuthGuardWithAnonymous)
  @SwaggerDecorators('채널 전체 리스트')
  @SwaggerPagination(1, 100)
  @Get()
  async getChannelList(@Query() query) {
    const data = await this.channelService.getChannelList(
      query.page,
      query.size,
    );
    console.log(data);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuardWithAnonymous)
  @SwaggerDecorators('채널 정보')
  @SwaggerParameter('Channel PK')
  @Get(':id')
  async getChannel(@Param('id') id: number) {
    const data = await this.channelService.getChannel(id);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('채널 생성')
  @Post()
  async createChannel(@Body() body: CreateChannelDTO) {
    const data = await this.channelService.createChannel(body);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('채널 수정')
  @SwaggerParameter('Channel PK')
  @Put(':id')
  async updateChannel(@Param('id') id: number, @Body() body: UpdateChannelDTO) {
    const data = await this.channelService.updateChannel(id, body);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('채널 삭제')
  @SwaggerParameter('Channel PK')
  @Delete(':id')
  async deleteChannel(@Param('id') id: number) {
    const data = await this.channelService.deleteChannel(id);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('채널 구독')
  @SwaggerParameter('Channel PK')
  @Post('subscribe/:id')
  async createSubscribe(@Param('id') id: number) {
    const data = await this.channelService.createSubscribe(id);
    return this.makeResponse({ data });
  }

  @UseGuards(AuthGuard)
  @SwaggerDecorators('구독 취소')
  @SwaggerParameter('Channel PK')
  @Delete('subscribe/:id')
  async deleteSubscribe(@Param('id') id: number) {
    const data = await this.channelService.deleteSubscribe(id);
    return this.makeResponse({ data })
  }
}
