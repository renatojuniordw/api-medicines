import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'medicines' })
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  reference: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  activeIngredient: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  tradeName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  holderOfSimilarMedicineRegistration: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  pharmaceuticalForm: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  concentration: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  inclusionDate: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
