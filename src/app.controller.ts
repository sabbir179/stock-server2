import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  healthCheck() {
    return {
      message: "I'm alive",
      version: '1.0.0',
    };
  }
}
