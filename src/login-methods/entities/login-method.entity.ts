import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Credential } from 'src/credentials/entities/credential.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class LoginMethod extends CommonEntity {
  @Column({ length: 6 })
  type: string;

  @OneToMany(() => Credential, (crendential) => crendential.loginMethod)
  crendential: Credential[];
}
