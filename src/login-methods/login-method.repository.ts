import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { LoginMethod } from "./entities/login-method.entity";
import { Repository } from "typeorm";
import { ILoginMethodRepository } from "./interfaces/login-method.repository.interface";

@CustomRepository(LoginMethod)
export class LoginMethodRepository extends Repository<LoginMethod> implements ILoginMethodRepository {}