import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.path;
    const excelData = this.medicineService.readExcel(filePath);
    console.log(excelData);
    // const createdObjects = await this.interchangeableMedicinesService.create(
    //   excelData,
    // );
    return excelData;
  }
}
