import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,

    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async createToken(user: User) {
    // Compose jwt payload
    const payload = {
      sub: user.id,
      username: user.username,
    };

    // Create jwt token from given payload
    const token = await this.jwtService.signAsync(payload);

    // Save token to database
    await this.authTokenRepository.save({ userId: user.id, user: user, token });

    return token;
  }

  // Register a new user
  async register(username: string, password: string): Promise<any> {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await this.usersService.create(username, passwordHash);

      return {
        access_token: await this.createToken(user),
      };
    } catch (error) {
      throw new BadRequestException(
        error.code === 'ER_DUP_ENTRY' ? 'Username already exists' : undefined,
      );
    }
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) throw new UnauthorizedException();

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword) throw new UnauthorizedException();

    return {
      access_token: await this.createToken(user),
    };
  }
}
