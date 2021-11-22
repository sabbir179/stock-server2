import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
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
