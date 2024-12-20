import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { PetRepository } from "./pet.repository";
import { PetController } from "./pet.controller";
import { PetService } from "./pet.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([PetRepository])],
    controllers: [PetController],
    providers: [PetService]
})
export class PetModule {}