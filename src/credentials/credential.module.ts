import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { CredentialRepository } from "./credential.repository";
import { CredentialController } from "./credential.controller";
import { CredentialService } from "./credential.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([CredentialRepository])],
    controllers: [CredentialController],
    providers: [CredentialService]
})
export class CredentialModule {}