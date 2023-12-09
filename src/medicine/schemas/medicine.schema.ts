import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'medicines' })
export class Medicine {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  reference: string;

  @Column()
  activeIngredient: string;

  @Column()
  tradeName: string;

  @Column()
  holderOfSimilarMedicineRegistration: string;

  @Column()
  pharmaceuticalForm: string;

  @Column()
  concentration: string;

  @Column()
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
