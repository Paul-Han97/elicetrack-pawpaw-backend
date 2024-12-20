import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { NotificationType } from "./entities/notification-type.entity";
import { Repository } from "typeorm";
import { INotificationTypeRepository } from "./interfaces/notification-type.repository.interface";

@CustomRepository(NotificationType)
export class NotificationTypeRepository extends Repository<NotificationType> implements INotificationTypeRepository {}