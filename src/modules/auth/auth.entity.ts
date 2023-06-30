import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuthToken {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to user (no need to access tokens from user entities)
  @ApiProperty()
  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @Column()
  token: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SignInDto extends RegisterDto {}
