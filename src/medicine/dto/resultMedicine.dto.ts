import { MedicineDto } from './medicine.dto';

export class ResultMedicine {
  data: MedicineDto[];
  total: number;
  pagination: Pagination;
}

export class Pagination {
  current: number;
  pageSize: number;
  total: number;
}
