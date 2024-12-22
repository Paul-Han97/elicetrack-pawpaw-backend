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

  @Column({
    default: PAWPAW,
    nullable: true,
  })
  createdUser: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedUser: string;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
