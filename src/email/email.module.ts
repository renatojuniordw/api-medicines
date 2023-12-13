import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { EmailService } from './email.service';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
