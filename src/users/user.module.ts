import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([UserRepository])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}