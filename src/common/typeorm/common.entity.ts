import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const PAWPAW = 'PawPaw';

export class CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    default: PAWPAW,
    nullable: true,
  })
  createdUser: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @Column({
    nullable: true,
  })
  updatedUser: string;

  @Exclude()
  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
