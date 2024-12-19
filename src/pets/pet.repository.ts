import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Pet } from "./entities/pet.entity";
import { Repository } from "typeorm";
import { IPetRepository } from "./interfaces/pet.repository.interface";

@CustomRepository(Pet)
export class PetRepository extends Repository<Pet> implements IPetRepository {}