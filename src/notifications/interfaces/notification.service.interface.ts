import { ResponseData } from "src/common/types/response.type";
import { GetNotificationDto, GetNotificationResponseDto } from "../dto/get-notification.dto";
import { UpdateReadStatusDto } from "../dto/update-read-status.dto";

export interface INotificationService {
    getNotification(getNotificationDto: GetNotificationDto): Promise<ResponseData<GetNotificationResponseDto>>
    updateReadStatus(updateReadStatusDto: UpdateReadStatusDto): Promise<ResponseData>
}
