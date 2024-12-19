import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { RoleRepository } from "./role.repository";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([RoleRepository])],
    controllers: [RoleController],
    providers: [RoleService]
})
export class RoleModule {}