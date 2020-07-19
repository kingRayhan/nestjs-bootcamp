import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HandleInvalidObjectId } from './utils/mongodb.filters';
import { HandleQuickCrudException } from './utils/QC.filters';
import * as cowSay from 'cowsay';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nestjs Ecommerce')
    .setDescription('Nest ecommerce api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  const config = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HandleQuickCrudException());
  app.useGlobalFilters(new HandleInvalidObjectId());

  await app.listen(config.get('PORT') || 3000);

  cowSay.say({
    text: `Server running: http://localhost:${config.get('PORT')}`,
    e: 'oO',
    T: 'U ',
  });
}
bootstrap();
