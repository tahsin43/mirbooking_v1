import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: false,
      forbidUnknownValues: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    optionsSuccessStatus: 204,
  });
  app.enableCors();

  const configDoc = new DocumentBuilder()
    .setTitle('MirBooking DB')
    .setDescription('MirBooking API description')
    .setVersion('1.0')
    .addTag('mirbooking')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, configDoc, options);
  SwaggerModule.setup('api', app, document);
  const config = new ConfigService();
  await app.listen((await config.getPortConfig()) || 3555);
}
bootstrap();
