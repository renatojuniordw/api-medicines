import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

import { Medicine } from './medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

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

  findAll(): Promise<Medicine[]> {
    return this.medicineRepository.find();
  }

  findOne(id: number): Promise<Medicine | null> {
    return this.medicineRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.medicineRepository.delete(id);
  }

  findForAbilify(): Promise<Medicine[]> {
    return this.medicineRepository.find({
      where: {
        reference: 'Abilify',
      },
    });
  }

  distinctReference(): Promise<Medicine[]> {
    return this.medicineRepository
      .createQueryBuilder('medicines')
      .select('medicines.reference', 'reference')
      .distinct(true)
      .getRawMany();
  }

  distinctActiveIngredient(): Promise<Medicine[]> {
    return this.medicineRepository
      .createQueryBuilder('medicines')
      .select('medicines.activeIngredient', 'activeIngredient')
      .distinct(true)
      .getRawMany();
  }

  distinctTradeName(): Promise<Medicine[]> {
    return this.medicineRepository
      .createQueryBuilder('medicines')
      .select('medicines.tradeName', 'tradeName')
      .distinct(true)
      .getRawMany();
  }

  distinctSimilarMedicine(): Promise<Medicine[]> {
    return this.medicineRepository
      .createQueryBuilder('medicines')
      .select(
        'medicines.holderOfSimilarMedicineRegistration',
        'holderOfSimilarMedicineRegistration',
      )
      .distinct(true)
      .getRawMany();
  }

  distinctPharmaceuticalForm(): Promise<Medicine[]> {
    return this.medicineRepository
      .createQueryBuilder('medicines')
      .select('medicines.pharmaceuticalForm', 'pharmaceuticalForm')
      .distinct(true)
      .getRawMany();
  }
}
