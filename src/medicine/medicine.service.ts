import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import * as moment from 'moment';
import * as XLSX from 'xlsx';

import { Medicine } from './schemas/medicine.schema';

import { FilterDto } from './dto/filter.dto';
import {
  ResultItemFilter,
  ResultMedicine,
  ResultNameMedicine,
} from './dto/resultMedicine.dto';
import { MedicineRepository } from './repository/medicines.repository';

@Injectable()
export class MedicineService {
  constructor(private medicineRepository: MedicineRepository) {}

  private capitalizeFirstWord(text: string): string {
    if (!text) {
      return '';
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private readExcel(filePath: string): Medicine[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    const listMedicines: Medicine[] = jsonData
      .map((item: any) => ({
        reference: item['__EMPTY'],
        activeIngredient: item['__EMPTY_1'],
        tradeName: item['__EMPTY_2'],
        holderOfSimilarMedicineRegistration: item['__EMPTY_3'],
        pharmaceuticalForm: item['__EMPTY_4'],
        concentration: item['__EMPTY_5'],
        inclusionDate: item['__EMPTY_6'],
      }))
      .filter(
        (item) =>
          item.activeIngredient !==
            'Lista de Medicamentos Similares e seus respectivos medicamentos de referência, conforme RDC 58/2014Atualizada até 11/05/2020, conforme o Diário Oficial da União.Lista de Medicamentos Similares classificada por ordem alfabética do medicamento de referência' &&
          item.holderOfSimilarMedicineRegistration !==
            'Detentor do registro do medicamento similar',
      )
      .map((item) => ({
        ...item,
        inclusionDate: moment(item.inclusionDate, 'MM/DD/YY').format(
          'DD/MM/YY',
        ),
        activeIngredient: this.capitalizeFirstWord(item.activeIngredient),
      }));

    return listMedicines;
  }

  private async create(listMedicines: Medicine[]): Promise<Medicine[]> {
    return await this.medicineRepository.save(listMedicines);
  }

  async importMedicines(filePath: string): Promise<Medicine[]> {
    const data = this.readExcel(filePath);
    return await this.create(data);
  }

  async findMedicine(
    page: number,
    pageSize: number,
    valueFilter: FilterDto,
  ): Promise<ResultMedicine> {
    const medicine =
      await this.medicineRepository.filterMedicinesWithPagination(
        page,
        pageSize,
        valueFilter,
      );

    if (!medicine.data) {
      throw new NotFoundException('Medicamentos não encontrado');
    }

    return medicine;
  }

  findOne(id: number): Promise<Medicine | null> {
    const medicine = this.medicineRepository.findOneBy({ id });

    if (!medicine) {
      throw new NotFoundException(`Medicamento de ID ${id}  não encontrado`);
    }

    return medicine;
  }

  async remove(id: number): Promise<void> {
    await this.medicineRepository.delete(id);
  }

  distinctReference(): Promise<ResultItemFilter[]> {
    return this.medicineRepository.getDistinct('reference');
  }

  distinctActiveIngredient(): Promise<ResultItemFilter[]> {
    return this.medicineRepository.getDistinct('activeIngredient');
  }

  distinctTradeName(): Promise<ResultItemFilter[]> {
    return this.medicineRepository.getDistinct('tradeName');
  }

  distinctSimilarMedicine(): Promise<ResultItemFilter[]> {
    return this.medicineRepository.getDistinct(
      'holderOfSimilarMedicineRegistration',
    );
  }

  distinctPharmaceuticalForm(): Promise<ResultItemFilter[]> {
    return this.medicineRepository.getDistinct('pharmaceuticalForm');
  }

  async getUniqueReferenceCounts(): Promise<ResultNameMedicine[]> {
    return this.medicineRepository.getAllDistinctAndCount('reference');
  }
}
