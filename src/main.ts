import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
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
