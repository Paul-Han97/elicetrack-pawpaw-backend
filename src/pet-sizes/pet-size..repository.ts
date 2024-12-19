import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { PetSize } from "./entities/pet-size.entity";
import { Repository } from "typeorm";
import { IPetSizeRepository } from "./interfaces/pet-size..repository.interface";

@CustomRepository(PetSize)
export class PetSizeRepository extends Repository<PetSize> implements IPetSizeRepository {}