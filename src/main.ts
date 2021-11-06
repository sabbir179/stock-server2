import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: '/health', method: RequestMethod.GET }],
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
