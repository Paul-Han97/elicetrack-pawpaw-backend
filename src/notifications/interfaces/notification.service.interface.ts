import { ResponseData } from "src/common/types/response.type";
import { GetNotificationDto, GetNotificationResponseDto } from "../dto/get-notification.dto";

export interface INotificationService {
    getNotification(getNotificationDto: GetNotificationDto): Promise<ResponseData<GetNotificationResponseDto>>
}
