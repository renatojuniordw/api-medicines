import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import 'dotenv/config';

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.EMAIL_HOST,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  defaults: {
    from: `"E-mail automático" ${process.env.EMAIL_FROM}`,
  },
  template: {
    dir: `${process.cwd()}/src/email/templates`,
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      strict: true,
    },
  },
};
