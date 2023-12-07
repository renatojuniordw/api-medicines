import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MedicineModule } from './medicine/medicine.module';

import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),

    MedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
