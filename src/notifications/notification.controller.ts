import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from 'src/common/guards/auth.decorator';
import {
  GetNotificationDto,
  GetNotificationResponseDto,
} from './dto/get-notification.dto';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: INotificationService,
  ) {}

  @ApiOperation({
    summary: '현재 존재하는 알림을 조회 합니다.',
    description: `
    - 읽지 않은 알림을 조회 합니다.`,
  })
  @ApiOkResponse({
    type: GetNotificationResponseDto,
  })
  @Auth()
  @Get()
  async getNotification(@Req() req: Request) {
    const user = req.session?.user;

    const getNotificationDto = new GetNotificationDto();
    getNotificationDto.userId = user?.id;

    const result =
      await this.notificationService.getNotification(getNotificationDto);
    return result;
  }
}
