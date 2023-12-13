import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';

import { AuthController } from './auth.controller';

import { JwtStrategy } from './stratgey/jwt.strategy';
import { UserRepository } from 'src/users/repository/users.repository';

import 'dotenv/config';
import { User } from 'src/users/entity/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 18000,
        audience: process.env.JWT_AUDIENCE,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, EmailService, UserRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
