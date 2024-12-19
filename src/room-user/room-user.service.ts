import { Inject, Injectable } from '@nestjs/common';
import { IRoomUserRepository } from './interfaces/room-user.repository.interface';
import { IRoomUserService } from './interfaces/room-user.service.interface';
import { RoomUserRepository } from './room-user.repository';

@Injectable()
export class RoomUserService implements IRoomUserService {
  constructor(
    @Inject(RoomUserRepository)
    private readonly roomUserRepository: IRoomUserRepository,
  ) {}
}
