import { IsOptional, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column('longtext')
  content: string;
}

export class CreatePageDto {
  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
