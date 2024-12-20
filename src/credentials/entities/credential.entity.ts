import { Expose } from 'class-transformer';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { LoginMethod } from 'src/login-methods/entities/login-method.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Credential extends CommonEntity {
  @Column()
  username: string;

  @Expose()
  @Column()
  password: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => LoginMethod)
  @JoinColumn({ referencedColumnName: 'id' })
  loginMethod: LoginMethod;
}
