import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { PetSize } from 'src/pet-sizes/entities/pet-size.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Pet extends CommonEntity {
  @Column()
  age: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Gender, (gender) => gender.pet)
  gender: Gender[];

  @OneToMany(() => PetSize, (petSize) => petSize.pet)
  petSize: PetSize[];
}
