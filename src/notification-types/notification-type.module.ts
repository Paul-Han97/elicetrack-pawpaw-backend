import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { NotificationTypeRepository } from "./notification-type.repository";
import { NotificationTypeController } from "./notification-type.controller";
import { NotificationTypeService } from "./notification-type.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([NotificationTypeRepository])],
    controllers: [NotificationTypeController],
    providers: [NotificationTypeService]
})
export class NotificationTypeModule {}