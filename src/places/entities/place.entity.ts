import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Place extends CommonEntity {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  postalCode: string;

  @Column()
  roadNameAddress: string;

  @Column()
  postalAddress: string;

  @Column()
  contact: string;

  @Column()
  closingDays: string;

  @Column()
  openingHour: string;

  @Column()
  hasParkingArea: boolean;

  @Column()
  price: string;

  @Column()
  allowSize: string;

  @Column()
  restrictions: string;

  @Column()
  description: string;

  @Column()
  additionalFees: string;

  @Column({ type: 'datetime' })
  lastUpdate: Date;
}
