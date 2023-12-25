import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterDto } from '../dto/filter.dto';
import { Medicine } from '../entity/medicine.entity';
import {
  ResultItemFilter,
  ResultMedicine,
  ResultNameMedicine,
} from '../dto/resultMedicine.dto';

@Injectable()
export class MedicineRepository extends Repository<Medicine> {
  constructor(private dataSource: DataSource) {
    super(Medicine, dataSource.createEntityManager());
  }

  async filterMedicinesWithPagination(
    page: number,
    pageSize: number,
    valueFilter: FilterDto,
  ): Promise<ResultMedicine> {
    const [data, total] = await this.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        ...valueFilter,
      },
    });

    const objectsWithKey = data.map((obj) => ({
      ...obj,
      key: obj.id,
    }));

    return { data: objectsWithKey, total };
  }

  getDistinct(column: string): Promise<ResultItemFilter[]> {
    const medicine = this.createQueryBuilder('medicines')
      .select(`medicines.${column}`, 'value')
      .orderBy(`medicines.${column}`, 'ASC')
      .distinct(true)
      .getRawMany();

    if (!medicine) {
      throw new NotFoundException('Medicamentos não encontrado');
    }

    return medicine;
  }

  async getAllDistinctAndCount(column: string): Promise<ResultNameMedicine[]> {
    const result = await this.createQueryBuilder('medicines')
      .select(`medicines.${column}`, 'nameMedicine')
      .addSelect(`COUNT(medicines.${column})`, 'amount')
      .groupBy(`medicines.${column}`)
      .orderBy(`medicines.${column}`, 'ASC')
      .getRawMany();

    return result;
  }
}
