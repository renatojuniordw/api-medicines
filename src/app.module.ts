import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { config } from './config/env.config';
import { mailerConfig } from './config/mailer.config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { MedicineModule } from './medicine/medicine.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
      connectTimeout: 60000,
    }),

    MailerModule.forRoot(mailerConfig),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ConfigModule.forRoot(),

    AuthModule,
    EmailModule,
    UsersModule,
    MedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
