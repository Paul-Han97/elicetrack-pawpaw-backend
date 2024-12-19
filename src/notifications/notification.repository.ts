import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { INotificationRepository } from "./interfaces/notification.repository.interface";

@CustomRepository(Notification)
export class NotificationRepository extends Repository<Notification> implements INotificationRepository {}