import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/Public';

@Controller()
export class AppController {
  @Public()
  @Get('/health')
  getHealth() {
    return 'OK';
  }
}
