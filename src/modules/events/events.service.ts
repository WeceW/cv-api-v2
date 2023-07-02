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

  /**
   * Find all events
   **/
  async findAll(filter?: string): Promise<Event[]> {
    return await this.eventsRepository.find({
      where: { event: filter },
      order: { timestamp: 'DESC' },
    });
  }

  /**
   * Get analytics
   */
  async analytics() {
    return {
      totalEvents: await this.eventsRepository.count(),

      uniqueSessions: (
        await this.eventsRepository
          .createQueryBuilder('event')
          .select('COUNT(DISTINCT "sessionID")', 'count')
          .getRawOne()
      )?.count,

      averageEventsPerSession: (
        await this.eventsRepository
          .createQueryBuilder('event')
          .select('COUNT("sessionID") / COUNT(DISTINCT "sessionID")', 'count')
          .getRawOne()
      )?.count,

      eventsPerDay: await this.eventsRepository
        .createQueryBuilder('event')
        .select('DATE("timestamp")', 'date')
        .addSelect('COUNT(*)', 'count')
        .groupBy('date')
        .orderBy('date', 'DESC')
        .getRawMany(),

      pageViews: await this.eventsRepository
        .createQueryBuilder('event')
        .select('"path"', 'path')
        .addSelect('COUNT(*)', 'count')
        .where('"path" IS NOT NULL')
        .groupBy('path')
        .orderBy('count', 'DESC')
        .getRawMany(),

      linksClicked: await this.eventsRepository
        .createQueryBuilder('event')
        .select('"linkTarget"', 'linkTarget')
        .addSelect('COUNT(*)', 'count')
        .where('"linkTarget" IS NOT NULL')
        .groupBy('"linkTarget"')
        .orderBy('count', 'DESC')
        .getRawMany(),

      eventsCount: await this.eventsRepository
        .createQueryBuilder('event')
        .select('"event"', 'event')
        .addSelect('COUNT(*)', 'count')
        .groupBy('event')
        .orderBy('count', 'DESC')
        .getRawMany(),

      employers: (
        await this.eventsRepository
          .createQueryBuilder('event')
          .select('"employer"')
          .where('"employer" IS NOT NULL')
          .groupBy('"employer"')
          .getRawMany()
      ).map((e) => e.employer),

      eventsPerColorTheme: await this.eventsRepository
        .createQueryBuilder('event')
        .select('"colorTheme"', 'colorTheme')
        .addSelect('COUNT(*)', 'count')
        .groupBy('"colorTheme"')
        .orderBy('count', 'DESC')
        .getRawMany(),

      uniqueSessionsPerScreenWidth: await this.eventsRepository
        .createQueryBuilder('event')
        .select(
          'FLOOR("screenWidth"::float / 160) * 160 || \' - \' || (FLOOR("screenWidth"::float / 160) + 1) * 160',
          'range',
        )
        .addSelect('COUNT(DISTINCT "sessionID")', 'count')
        .where('"screenWidth" IS NOT NULL')
        .groupBy('range')
        .orderBy('range', 'DESC')
        .getRawMany(),

      uniqueSessionsPerScreenOrientation: await this.eventsRepository
        .createQueryBuilder('event')
        .select(
          'CASE WHEN "screenWidth" > "screenHeight" THEN \'Landscape\' ELSE \'Portrait\' END',
          'orientation',
        )
        .addSelect('COUNT(DISTINCT "sessionID")', 'count')
        .where('"screenWidth" IS NOT NULL')
        .andWhere('"screenHeight" IS NOT NULL')
        .groupBy('orientation')
        .orderBy('orientation', 'DESC')
        .getRawMany(),
    };
  }
}
