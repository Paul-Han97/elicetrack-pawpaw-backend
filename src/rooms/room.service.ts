import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from './interfaces/room.repository.interface';
import { IRoomService } from './interfaces/room.service.interface';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService implements IRoomService {
  constructor(
    @Inject(RoomRepository)
    private readonly roomRepository: IRoomRepository,
  ) {}
}
