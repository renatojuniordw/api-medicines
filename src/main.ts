import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Interchangeable Medicines')
    .setDescription('API about Interchangeable Medicines')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app
    .listen(3000 || process.env.PORT)
    .then(() => {
      console.log(`Server running`);
    })
    .catch((error) => {
      console.error(`Failed to start server: ${error}`);
    });
}
bootstrap();
