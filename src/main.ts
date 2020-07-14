import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HandleInvalidObjectId } from './utils/mongodb.filters';
import { HandleQuickCrudException } from './utils/QC.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nestjs Ecommerce')
    .setDescription('Nest ecommerce api documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  const config = new ConfigService();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HandleQuickCrudException());
  app.useGlobalFilters(new HandleInvalidObjectId());

  await app.listen(config.get('PORT') || 3000);

  console.log('Server is running...');
}
bootstrap();
