import { Controller, Inject } from '@nestjs/common';
import { IRoomUserService } from './interfaces/room-user.service.interface';
import { RoomUserService } from './room-user.service';

@Controller('room-users')
export class RoomUserController {
  constructor(
    @Inject(RoomUserService)
    private readonly roomUserService: IRoomUserService,
  ) {}
}
