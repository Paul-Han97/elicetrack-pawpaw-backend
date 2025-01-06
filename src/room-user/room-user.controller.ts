import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from 'src/common/guards/auth.decorator';
import {
  GetRoomListDto,
  GetRoomListResponseDto,
} from './dto/get-room-list.dto';
import { IRoomUserService } from './interfaces/room-user.service.interface';
import { RoomUserService } from './room-user.service';

@Controller('room-users')
export class RoomUserController {
  constructor(
    @Inject(RoomUserService)
    private readonly roomUserService: IRoomUserService,
  ) {}

  @ApiOperation({
    summary: '로그인한 사용자의 채팅방 목록을 조회 합니다.',
    description: `
    - 로그인된 사용자가 연결되어 있는 채팅방을 조회 합니다.`,
  })
  @ApiOkResponse({
    type: GetRoomListResponseDto,
  })
  @Auth()
  @ApiCookieAuth()
  @Get()
  async getRoomList(@Req() req: Request) {
    const user = req.session.user;

    const getRoomListDto = new GetRoomListDto();
    getRoomListDto.userId = user.id;

    const result = await this.roomUserService.getRoomList(getRoomListDto);

    return result;
  }
}
