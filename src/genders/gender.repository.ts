import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Gender } from "./entities/gender.entity";
import { Repository } from "typeorm";
import { IGenderRepository } from "./interfaces/gender.repository.interface";

@CustomRepository(Gender)
export class GenderRepository extends Repository<Gender> implements IGenderRepository {}