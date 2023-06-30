import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to user (no need to access tokens from user entities)
  @ManyToOne(() => User)
  user: User;

  @Column()
  token: string;
}

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignInDto extends RegisterDto {}
