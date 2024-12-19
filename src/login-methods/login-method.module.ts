import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { LoginMethodRepository } from "./login-method.repository";
import { LoginMethodController } from "./login-method.controller";
import { LoginMethodService } from "./login-method.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([LoginMethodRepository])],
    controllers: [LoginMethodController],
    providers: [LoginMethodService]
})
export class LoginMethodModule {}