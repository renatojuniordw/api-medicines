import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}
