import { Expose } from "class-transformer";
import { CommonEntity } from "src/common/typeorm/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Credential extends CommonEntity {
    @Column()
    username: string;

    @Expose()
    @Column()
    password: string;
}