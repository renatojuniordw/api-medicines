import {
  Get,
  Body,
  Post,
  Query,
  UseGuards,
  Controller,
  UploadedFile,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MedicineService } from './medicine.service';
import { Medicine } from './schemas/medicine.schema';

import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ResultPagedMedicines } from './dto/resultMedicine.dto';

import { JwtAudienceGuard } from 'src/shared/guard/jwt-audience-guard';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('import')
  @UseGuards(JwtAudienceGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.medicineService.importMedicines(file.path);
  }

  @Get('all')
  @UseGuards(JwtAudienceGuard)
  async getAll(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<ResultPagedMedicines> {
    const { page, pageSize } = paginationDto;
    const { data, total } = await this.medicineService.findAll(page, pageSize);

    return { data, total, pagination: { current: page, pageSize, total } };
  }

  @Post()
  @UseGuards(JwtAudienceGuard)
  async getMedicine(
    @Body() filter: FilterDto,
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<ResultPagedMedicines> {
    const { page, pageSize } = paginationDto;
    const { data, total } = await this.medicineService.findMedicine(
      page,
      pageSize,
      filter,
    );

    return { data, total, pagination: { current: page, pageSize, total } };
  }

  @Get('abilify')
  @UseGuards(JwtAudienceGuard)
  getAllForAbilify(): Promise<Medicine[]> {
    return this.medicineService.findForAbilify();
  }

  @Get('reference')
  @UseGuards(JwtAudienceGuard)
  getReferences(): Promise<Medicine[]> {
    return this.medicineService.distinctReference();
  }

  @Get('active-ingredient')
  @UseGuards(JwtAudienceGuard)
  getActiveIngredient(): Promise<Medicine[]> {
    return this.medicineService.distinctActiveIngredient();
  }

  @Get('trade-name')
  @UseGuards(JwtAudienceGuard)
  getTradeName(): Promise<Medicine[]> {
    return this.medicineService.distinctTradeName();
  }

  @Get('similar-medicine')
  @UseGuards(JwtAudienceGuard)
  getSimilarMedicine(): Promise<Medicine[]> {
    return this.medicineService.distinctSimilarMedicine();
  }

  @Get('pharmaceutical-form')
  @UseGuards(JwtAudienceGuard)
  getPharmaceuticalForm(): Promise<Medicine[]> {
    return this.medicineService.distinctPharmaceuticalForm();
  }

  @Get('reference-counts')
  @UseGuards(JwtAudienceGuard)
  getReferenceCounts(): Promise<{ reference: string; count: number }[]> {
    return this.medicineService.getUniqueReferenceCounts();
  }
}
