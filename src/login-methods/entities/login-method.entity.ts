import { CommonEntity } from "src/common/typeorm/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class LoginMethod extends CommonEntity {
    @Column({ length: 6 })
    type: string;
}