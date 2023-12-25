import { ApiProperty } from '@nestjs/swagger';

export class BodyEmail {
  @ApiProperty({
    description: 'User who will receive the email',
    type: String,
  })
  to: string;

  @ApiProperty({
    description: 'Email title',
    type: String,
  })
  subject: string;

  @ApiProperty({
    type: String,
  })
  text: string;
}
