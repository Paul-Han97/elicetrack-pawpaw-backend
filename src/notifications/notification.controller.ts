import { Controller, Get, Inject, Param, Put, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from 'src/common/guards/auth.decorator';
import {
  GetNotificationDto,
  GetNotificationResponseDto,
} from './dto/get-notification.dto';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationService } from './notification.service';
import { UpdateReadStatusDto } from './dto/update-read-status.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: INotificationService,
  ) {}

  @ApiOperation({
    summary: '현재 존재하는 알림을 조회 합니다.',
    description: `
    - 읽지 않은 알림을 조회 합니다.
    - type이 INVITE 일 때 message는 null 입니다.`,
  })
  @ApiOkResponse({
    type: GetNotificationResponseDto,
  })
  @Auth()
  @Get()
  async getNotification(@Req() req: Request) {
    const user = req.session?.user;

    const getNotificationDto = new GetNotificationDto();
    getNotificationDto.recipientId = user?.id;

    const result =
      await this.notificationService.getNotification(getNotificationDto);
    return result;
  }

  @ApiOperation({
    summary: '알림의 읽음 상태를 변경 합니다.',
    description: `
    - 사용자가 알림을 클릭하여 읽음 상태로 변경 합니다.
    - 해당 notification의 isRead가 true로 변경 됩니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '알림의 ID'
  })
  @ApiOkResponse({
    description: '성공적으로 변경 되었을 때'
  })
  @Auth()
  @Put(':id')
  async updateReadStatus(@Req() req: Request, @Param('id') id: number) {
    const user = req.session?.user;

    const updateReadStatusDto = new UpdateReadStatusDto();
    updateReadStatusDto.id = id;
    updateReadStatusDto.userId = user.id;

    const result =
      await this.notificationService.updateReadStatus(updateReadStatusDto);
    return result;
  }
}
