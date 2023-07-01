import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PagesModule } from './modules/pages/pages.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import typeormConfig from 'typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(typeormConfig),
    PagesModule,
    AuthModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
