import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserRole } from './user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  @ApiProperty({
    type: String,
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsOptional()
  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  role: UserRole;

  @IsOptional()
  @ApiProperty({
    type: Boolean,
  })
  status: boolean;
}
