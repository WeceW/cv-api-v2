import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto, SignInResponse } from './auth.entity';
import { Public } from '../../decorators/Public';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'JWT token',
    type: SignInResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signInDto: RegisterDto) {
    return this.authService.register(signInDto.username, signInDto.password);
  }

  @ApiResponse({
    status: 200,
    description: 'JWT token',
    type: SignInResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
