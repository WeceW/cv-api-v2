import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'src/decorators/Public';
import { CreateEventDto, Event } from './event.entity';
import { EventsService } from './events.service';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiParam({ type: Event, name: 'event' })
  @Public()
  @Post()
  create(@Body() event: CreateEventDto) {
    return this.eventsService.create(event);
  }

  @ApiBearerAuth()
  @ApiQuery({
    type: 'string',
    name: 'filter',
    required: false,
    example: 'page-view',
  })
  @ApiResponse({
    status: 200,
    type: Event,
    isArray: true,
  })
  @Get()
  findAll(@Query() query: { filter?: string }) {
    return this.eventsService.findAll(query.filter);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Analytics data',
  })
  @Get('analytics')
  analytics() {
    return this.eventsService.analytics();
  }
}
