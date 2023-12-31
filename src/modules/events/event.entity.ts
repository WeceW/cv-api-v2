import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  event: string;

  @ApiProperty()
  @Column()
  sessionID: string;

  @ApiProperty()
  @Column()
  timestamp: string;

  @ApiProperty()
  @Column()
  origin: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  path?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  linkTarget?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'integer', nullable: true })
  screenWidth?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'integer', nullable: true })
  screenHeight?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  colorTheme?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  employer?: string;
}

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  event: string;

  @ApiProperty()
  @IsString()
  sessionID: string;

  @ApiProperty()
  @IsString()
  timestamp: string;

  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  path?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  linkTarget?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  screenWidth?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  screenHeight?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  colorTheme?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  employer?: string;
}
