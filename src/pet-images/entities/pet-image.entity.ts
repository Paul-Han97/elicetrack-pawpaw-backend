import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Image } from 'src/images/entities/image.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PetImage extends CommonEntity {
  @ManyToOne(() => Image)
  @JoinColumn({ referencedColumnName: 'id' })
  image: Image;
  
  @ManyToOne(() => Pet)
  @JoinColumn({ referencedColumnName: 'id' })
  pet: Pet;
}
