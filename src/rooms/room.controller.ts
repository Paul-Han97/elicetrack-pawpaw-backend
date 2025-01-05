import { Controller, Inject } from '@nestjs/common';
import { IRoomService } from './interfaces/room.service.interface';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(
    @Inject(RoomService)
    private readonly roomService: IRoomService,
  ) {}
}
