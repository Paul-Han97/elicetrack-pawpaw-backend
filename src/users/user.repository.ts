import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { IUserRepository } from "./interfaces/user.repository.interface";

@CustomRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {}