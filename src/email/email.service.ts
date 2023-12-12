import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

import { BodyEmail } from './dto/body-email.dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(body: BodyEmail): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER_ALIAS,
      ...body,
    });
  }
}
