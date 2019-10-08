import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const PORT = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    swaggerInit(app);
  } else {
    app.enableCors({ origin: serverConfig.origin });
  }

  await app.listen(PORT);
  logger.log(`Application listening on port [${PORT}]`);
}

function swaggerInit(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('The task API description')
    .setVersion('1.0')
    .addTag('task')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
