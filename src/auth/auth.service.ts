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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
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
