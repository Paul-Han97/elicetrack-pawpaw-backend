import { ResponseData } from 'src/common/types/response.type';
import {
  GetNotificationDto,
  GetNotificationResponseDto,
} from '../dto/get-notification.dto';
import { UpdateReadStatusDto } from '../dto/update-read-status.dto';
import {
  WsCreateNotificationDto,
  WsCreateNotificationResponseDto,
} from '../dto/ws-create-notification.dto';

export interface INotificationService {
  getNotification(
    getNotificationDto: GetNotificationDto,
  ): Promise<ResponseData<GetNotificationResponseDto>>;
  updateReadStatus(
    updateReadStatusDto: UpdateReadStatusDto,
  ): Promise<ResponseData>;
  wsCreateNotification(
    wsCreateNotificationDto: WsCreateNotificationDto,
  ): Promise<WsCreateNotificationResponseDto>;
}
