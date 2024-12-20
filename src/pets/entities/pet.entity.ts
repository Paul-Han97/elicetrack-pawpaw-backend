import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { PetImage } from 'src/pet-images/entities/pet-image.entity';
import { PetSize } from 'src/pet-sizes/entities/pet-size.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Pet extends CommonEntity {
  @Column()
  age: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Gender)
  @JoinColumn({ referencedColumnName: 'id' })
  gender: Gender;

  @ManyToOne(() => PetSize)
  @JoinColumn({ referencedColumnName: 'id' })
  petSize: PetSize;

  @OneToMany(() => PetImage, (petImage) => petImage.pet)
  petImage: PetImage[];
}
