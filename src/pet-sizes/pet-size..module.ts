import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { PetSizeRepository } from "./pet-size..repository";
import { PetSizeController } from "./pet-size..controller";
import { PetSizeService } from "./pet-size..service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([PetSizeRepository])],
    controllers: [PetSizeController],
    providers: [PetSizeService]
})
export class PetSizeModule {}