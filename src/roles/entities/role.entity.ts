import { CommonEntity } from 'src/common/typeorm/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column()
  type: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
