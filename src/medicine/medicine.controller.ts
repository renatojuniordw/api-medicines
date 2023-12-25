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

import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import {
  ResultItemFilter,
  ResultNameMedicine,
  ResultPagedMedicine,
} from './dto/resultMedicine.dto';

import { JwtAudienceGuard } from 'src/shared/guard/jwt-audience-guard';
import { UserRole } from 'src/users/dto/user-role.enum';
import { Role } from 'src/auth/decorator/role.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from 'src/shared/dto/file-upload.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('medicine')
@ApiTags('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('import')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of Medicines',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.medicineService.importMedicines(file.path);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async getMedicine(
    @Body() filter: FilterDto,
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<ResultPagedMedicine> {
    const { page, pageSize } = paginationDto;
    const { data, total } = await this.medicineService.findMedicine(
      page,
      pageSize,
      filter,
    );

    return { data, total, pagination: { current: page, pageSize, total } };
  }

  @Get('reference')
  @UseGuards(AuthGuard('jwt'))
  getReferences(): Promise<ResultItemFilter[]> {
    return this.medicineService.distinctReference();
  }

  @Get('active-ingredient')
  @UseGuards(AuthGuard('jwt'))
  getActiveIngredient(): Promise<ResultItemFilter[]> {
    return this.medicineService.distinctActiveIngredient();
  }

  @Get('trade-name')
  @UseGuards(AuthGuard('jwt'))
  getTradeName(): Promise<ResultItemFilter[]> {
    return this.medicineService.distinctTradeName();
  }

  @Get('similar-medicine')
  @UseGuards(AuthGuard('jwt'))
  getSimilarMedicine(): Promise<ResultItemFilter[]> {
    return this.medicineService.distinctSimilarMedicine();
  }

  @Get('pharmaceutical-form')
  @UseGuards(AuthGuard('jwt'))
  getPharmaceuticalForm(): Promise<ResultItemFilter[]> {
    return this.medicineService.distinctPharmaceuticalForm();
  }

  @Get('reference-counts')
  @UseGuards(AuthGuard('jwt'))
  getReferenceCounts(): Promise<ResultNameMedicine[]> {
    return this.medicineService.getUniqueReferenceCounts();
  }
}
