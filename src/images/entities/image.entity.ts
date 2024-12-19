import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image extends CommonEntity {
  @Column()
  url: string;
}
