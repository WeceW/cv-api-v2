import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto, Event } from './event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  /**
   * Create a new event
   */
  async create(payload: CreateEventDto) {
    return await this.eventsRepository.save(payload);
  }
}
