import { ApiProperty } from '@nestjs/swagger';
import { MedicineDto } from './medicine.dto';

export class ResultMedicine {
  @ApiProperty({
    type: [MedicineDto],
  })
  data: MedicineDto[];

  @ApiProperty({
    type: Number,
  })
  total: number;
}

export class Pagination {
  @ApiProperty({
    type: Number,
  })
  current: number;

  @ApiProperty({
    type: Number,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
  })
  total: number;
}

export class ResultPagedMedicine extends ResultMedicine {
  @ApiProperty({
    type: () => Pagination,
  })
  pagination: Pagination;
}

export class ResultNameMedicine {
  nameMedicine: string;
  amount: string;
}

export class ResultItemFilter {
  value: string;
}
