import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { IRoleRepository } from "./interfaces/role.repository.interface";

@CustomRepository(Role)
export class RoleRepository extends Repository<Role> implements IRoleRepository {}