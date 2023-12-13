import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import { UserRepository } from 'src/users/repository/users.repository';

import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { User } from 'src/users/entity/user.entity';
import { UserRole } from 'src/users/dto/user-role.enum';

import * as path from 'path';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailerService: EmailService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { name, email, id } = user;

    const token = await this.jwtService.sign({
      id,
      email,
    });

    return { name, email, token };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const user = await this.userRepository.createUser(
        createUserDto,
        UserRole.USER,
      );

      const { email, id } = user;

      const token = await this.jwtService.sign({
        id,
        email,
      });

      await this.mailerService.sendUserConfirmation(user, token);
      return null;
    }
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.userRepository.update(
      { confirmationToken },
      { confirmationToken: null },
    );
    if (result.affected === 0) throw new NotFoundException('Token inválido');
  }
}
