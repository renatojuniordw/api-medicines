import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, ResponseAuth } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto): Promise<ResponseAuth> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto): Promise<ResponseAuth> {
    return this.authService.login(dto);
  }
}
