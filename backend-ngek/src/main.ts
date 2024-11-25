import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: ['log', 'debug', 'error', 'warn'],
  });

  const config = new DocumentBuilder()
    .setTitle('Ngek')
    .setDescription('The Ngek API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      enableDebugMessages: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );
  app.useBodyParser('json');
  app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();
