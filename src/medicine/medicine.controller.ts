import {
  Get,
  Post,
  Query,
  Controller,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';
import { Medicine } from './schemas/medicine.schema';

import { PaginationQuery } from './schemas/pagination.query';

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
  getAll(@Query() query: PaginationQuery): Promise<Medicine[]> {
    const { page, limit } = query;
    return this.medicineService.findAll(page, limit);
  }

  @Get('abilify')
  @UseGuards(AuthGuard('jwt'))
  getAllForAbilify(): Promise<Medicine[]> {
    return this.medicineService.findForAbilify();
  }

  @Get('reference')
  @UseGuards(AuthGuard('jwt'))
  getReferences(): Promise<Medicine[]> {
    return this.medicineService.distinctReference();
  }

  @Get('active-ingredient')
  @UseGuards(AuthGuard('jwt'))
  getActiveIngredient(): Promise<Medicine[]> {
    return this.medicineService.distinctActiveIngredient();
  }

  @Get('trade-name')
  @UseGuards(AuthGuard('jwt'))
  getTradeName(): Promise<Medicine[]> {
    return this.medicineService.distinctTradeName();
  }

  @Get('similar-medicine')
  @UseGuards(AuthGuard('jwt'))
  getSimilarMedicine(): Promise<Medicine[]> {
    return this.medicineService.distinctSimilarMedicine();
  }

  @Get('pharmaceutical-form')
  @UseGuards(AuthGuard('jwt'))
  getPharmaceuticalForm(): Promise<Medicine[]> {
    return this.medicineService.distinctPharmaceuticalForm();
  }
}
