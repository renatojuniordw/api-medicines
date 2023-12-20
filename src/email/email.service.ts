import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'src/users/entity/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bem-vindo ao MedInter Web! Confirme seu email',
      template: './confirmation',
      context: {
        name: user.name,
        token: user.confirmationToken,
        url,
      },
    });
  }

  async sendRecoverPassword(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      template: './recover-password',
      context: {
        token,
      },
    });
  }
}
