import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Gender extends CommonEntity {
  @Column({ length: 6 })
  type: string;

  @ManyToOne(() => Pet)
  @JoinColumn({ referencedColumnName: 'id' })
  pet: Pet;
}
