import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { GenderRepository } from "./gender.repository";
import { GenderController } from "./gender.controller";
import { GenderService } from "./gender.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([GenderRepository])],
    controllers: [GenderController],
    providers: [GenderService]
})
export class GenderModule {}