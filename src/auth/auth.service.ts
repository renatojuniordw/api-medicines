import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthDto, ResponseAuth } from './dto/auth.dto';
import { Auth } from './schema/auth.schema';

import { EmailService } from 'src/email/email.service';

import { BodyEmail } from 'src/email/dto/body-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: AuthDto): Promise<ResponseAuth> {
    const existingUser = await this.authRepository.findOneBy({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPass = await bcrypt.hash(dto.password, 10);
    const newUser = await this.authRepository.save({
      email: dto.email,
      password: hashedPass,
    });

    const token = this.createToken(newUser.id, newUser.email);

    await this.emailService.sendMail({
      to: newUser.email,
      subject: '[MedInter] Usuário registado com sucesso! ',
      text: `Olá ${newUser.name}, seja bem-vindo ao MedInter! \n Aqui, você terá na palma da sua mão informações sobre todos os medicamentos intercambiáveis e muito mais.`,
    });

    return { name: newUser.name, email: newUser.email, token };
  }

  async login(dto: AuthDto): Promise<ResponseAuth> {
    const user = await this.authRepository.findOneBy({
      email: dto.email,
    });

    if (!user) throw new UnauthorizedException('Wrong email');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Wrong password');
    const token = this.createToken(user.id, user.email);

    return { name: user.name, email: user.email, token };
  }

  createToken(id, email) {
    return this.jwtService.sign({ id, email });
  }
}
