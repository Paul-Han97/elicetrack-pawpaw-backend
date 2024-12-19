import { Module } from "@nestjs/common";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm-custom.module";
import { NotificationRepository } from "./notification.repository";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([NotificationRepository])],
    controllers: [NotificationController],
    providers: [NotificationService]
})
export class NotificationModule {}