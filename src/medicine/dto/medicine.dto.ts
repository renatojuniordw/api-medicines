import { ApiProperty } from '@nestjs/swagger';

export class MedicineDto {
  @ApiProperty({
    type: Number,
  })
  id?: number;

  @ApiProperty({
    type: String,
  })
  reference: string;

  @ApiProperty({
    type: String,
  })
  activeIngredient: string;

  @ApiProperty({
    type: String,
  })
  tradeName: string;

  @ApiProperty({
    type: String,
  })
  holderOfSimilarMedicineRegistration: string;

  @ApiProperty({
    type: String,
  })
  pharmaceuticalForm: string;

  @ApiProperty({
    type: String,
  })
  concentration: string;

  @ApiProperty({
    type: String,
    description: 'Date on which the medicine was added to the list.',
  })
  inclusionDate: string;

  @ApiProperty({
    type: Date,
  })
  createdAt?: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt?: Date;

  @ApiProperty({
    type: Number,
  })
  key?: number;
}
