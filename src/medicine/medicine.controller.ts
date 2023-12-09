import {
  Get,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';
import { Medicine } from './schemas/medicine.schema';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('import')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.medicineService.importMedicines(file.path);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(): Promise<Medicine[]> {
    return this.medicineService.findAll();
  }

  @Get('find/abilify')
  @UseGuards(AuthGuard('jwt'))
  getAllForAbilify(): Promise<Medicine[]> {
    return this.medicineService.findForAbilify();
  }

  @Get('find/reference')
  @UseGuards(AuthGuard('jwt'))
  getReferences(): Promise<Medicine[]> {
    return this.medicineService.distinctReference();
  }

  @Get('find/active-ingredient')
  @UseGuards(AuthGuard('jwt'))
  getActiveIngredient(): Promise<Medicine[]> {
    return this.medicineService.distinctActiveIngredient();
  }

  @Get('find/trade-name')
  @UseGuards(AuthGuard('jwt'))
  getTradeName(): Promise<Medicine[]> {
    return this.medicineService.distinctTradeName();
  }

  @Get('find/similar-medicine')
  @UseGuards(AuthGuard('jwt'))
  getSimilarMedicine(): Promise<Medicine[]> {
    return this.medicineService.distinctSimilarMedicine();
  }

  @Get('find/pharmaceutical-form')
  @UseGuards(AuthGuard('jwt'))
  getPharmaceuticalForm(): Promise<Medicine[]> {
    return this.medicineService.distinctPharmaceuticalForm();
  }
}
