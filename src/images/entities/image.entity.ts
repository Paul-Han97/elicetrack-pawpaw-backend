import { BoardImage } from 'src/board-images/entities/board-image.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { PetImage } from 'src/pet-images/entities/pet-image.entity';
import { UserImage } from 'src/user-images/entities/user-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image extends CommonEntity {
  @Column()
  url: string;

  @OneToMany(() => UserImage, (userImage) => userImage.image)
  userImage: UserImage[];

  @OneToMany(() => PetImage, (petImage) => petImage.image)
  petImage: PetImage[];

  @OneToMany(() => BoardImage, (boardImage) => boardImage.image)
  boardImage: BoardImage[];
}
