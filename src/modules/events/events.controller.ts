import { Body, Controller, Post } from '@nestjs/common';
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
}
