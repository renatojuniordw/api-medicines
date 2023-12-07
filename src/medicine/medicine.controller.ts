import {
  Get,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';
import { Medicine } from './medicine.entity';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.medicineService.importMedicines(file.path);
  }

  @Get()
  getAll(): Promise<Medicine[]> {
    return this.medicineService.findAll();
  }

  @Get('find/abilify')
  getAllForAbilify(): Promise<Medicine[]> {
    return this.medicineService.findForAbilify();
  }

  @Get('find/reference')
  getReferences(): Promise<Medicine[]> {
    return this.medicineService.distinctReference();
  }

  @Get('find/active-ingredient')
  getActiveIngredient(): Promise<Medicine[]> {
    return this.medicineService.distinctActiveIngredient();
  }

  @Get('find/trade-name')
  getTradeName(): Promise<Medicine[]> {
    return this.medicineService.distinctTradeName();
  }

  @Get('find/similar-medicine')
  getSimilarMedicine(): Promise<Medicine[]> {
    return this.medicineService.distinctSimilarMedicine();
  }

  @Get('find/pharmaceutical-form')
  getPharmaceuticalForm(): Promise<Medicine[]> {
    return this.medicineService.distinctPharmaceuticalForm();
  }
}
