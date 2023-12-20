import { MedicineDto } from './medicine.dto';

export class ResultMedicine {
  data: MedicineDto[];
  total: number;
}

export class Pagination {
  current: number;
  pageSize: number;
  total: number;
}

export class ResultPagedMedicine extends ResultMedicine {
  pagination: Pagination;
}

export class ResultNameMedicine {
  nameMedicine: string;
  amount: string;
}

export class ResultItemFilter {
  value: string;
}
