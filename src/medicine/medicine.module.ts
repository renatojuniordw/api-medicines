import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entity/medicine.entity';
import { MedicineRepository } from './repository/medicines.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine, MedicineRepository]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  providers: [MedicineService, MedicineRepository],
  controllers: [MedicineController],
})
export class MedicineModule {}
