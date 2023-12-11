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

export class ResultPagedMedicines extends ResultMedicine {
  pagination: Pagination;
}
