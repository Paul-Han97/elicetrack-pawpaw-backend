import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Place)
  @JoinColumn({ referencedColumnName: 'id' })
  place: Place;
}
