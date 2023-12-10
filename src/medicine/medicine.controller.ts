import {
  Get,
  Post,
  Query,
  UseGuards,
  Controller,
  UploadedFile,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';
import { Medicine } from './schemas/medicine.schema';

import { PaginationDto } from './dto/pagination.dto';
import { ResultMedicine } from './dto/resultMedicine.dto';

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
  async getAll(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<ResultMedicine> {
    const { page, pageSize } = paginationDto;
    const { data, total } = await this.medicineService.findAll(page, pageSize);

    return { data, total, pagination: { current: page, pageSize, total } };
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

  @Get('reference-counts')
  @UseGuards(AuthGuard('jwt'))
  getReferenceCounts(): Promise<{ reference: string; count: number }[]> {
    return this.medicineService.getUniqueReferenceCounts();
  }
}
