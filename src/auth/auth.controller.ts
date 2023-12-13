import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'src/users/entity/user.entity';

import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body() credentiaslsDto: CredentialsDto,
  ): Promise<{ name: string; email: string; token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {
    console.log(token);
    const user = await this.authService.confirmEmail(token);
    return {
      message: 'Email confirmado',
    };
  }
}
