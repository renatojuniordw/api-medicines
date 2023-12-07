import { Module } from '@nestjs/common';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
