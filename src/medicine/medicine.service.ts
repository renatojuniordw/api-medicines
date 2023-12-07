import { Injectable } from '@nestjs/common';

import * as moment from 'moment';
import * as XLSX from 'xlsx';

import { Medicine } from './medicine.entity';

@Injectable()
export class MedicineService {
  readExcel(filePath: string): any[] {
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
        inclusionDate: moment(item.inclusionDate).format('DD/MM/YYYY'),
      }));

    return listMedicines;
  }
}
