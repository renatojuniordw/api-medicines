import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  readonly page?: number = 1;

  @IsOptional()
  readonly pageSize?: number = 10;
}
