import { BoardImage } from 'src/board-images/entities/board-image.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => BoardImage, (BoardImage) => BoardImage.board)
  boardImage: BoardImage[];
}
