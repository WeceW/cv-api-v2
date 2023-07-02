import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'src/decorators/Public';
import { CreateEventDto } from './event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Public()
  @Post()
  create(@Body() event: CreateEventDto) {
    return this.eventsService.create(event);
  }

  @Get()
  findAll(@Query() query: { filter?: string }) {
    return this.eventsService.findAll(query.filter);
  }

  @Get('analytics')
  analytics() {
    return this.eventsService.analytics();
  }
}
