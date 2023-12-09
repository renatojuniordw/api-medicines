import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dto/auth.dto';
import { Auth } from './schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto): Promise<string> {
    const hashedPass = await bcrypt.hash(dto.password, 10);
    console.log(hashedPass);
    const newUser = await this.authRepository.save({
      email: dto.email,
      password: hashedPass,
    });

    return this.createToken(newUser.id, newUser.email);
  }

  async login(dto: AuthDto): Promise<string> {
    const user = await this.authRepository.findOneBy({
      email: dto.email,
    });
    if (!user) throw new UnauthorizedException('Wrong email');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Wrong password');
    return this.createToken(user.id, user.email);
  }

  createToken(id, email) {
    return this.jwtService.sign({ id, email });
  }
}
