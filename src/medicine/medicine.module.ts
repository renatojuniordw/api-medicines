import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './schemas/medicine.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
