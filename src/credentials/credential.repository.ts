import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Credential } from "./entities/credential.entity";
import { Repository } from "typeorm";
import { ICredentialRepository } from "./interfaces/credential.repository.interface";

@CustomRepository(Credential)
export class CredentialRepository extends Repository<Credential> implements ICredentialRepository {}