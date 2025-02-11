import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ChatRepository } from 'src/chats/chat.repository';
import { IChatRepository } from 'src/chats/interfaces/chat.repository.interface';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { INotificationRepository } from 'src/notifications/interfaces/notification.repository.interface';
import { NotificationRepository } from 'src/notifications/notification.repository';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { DataSource } from 'typeorm';
import { CreateRoomResponseDto } from './dto/create-room.dto';
import {
  GetRoomListDto,
  GetRoomListResponseDto,
} from './dto/get-room-list.dto';
import { RoomUser } from './entities/room-user.entity';
import { IRoomUserRepository } from './interfaces/room-user.repository.interface';
import { IRoomUserService } from './interfaces/room-user.service.interface';
import { RoomUserRepository } from './room-user.repository';

@Injectable()
export class RoomUserService implements IRoomUserService {
  constructor(
    @Inject(RoomUserRepository)
    private readonly roomUserRepository: IRoomUserRepository,

    @Inject(NotificationRepository)
    private readonly notificationRepository: INotificationRepository,

    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

    private readonly utilService: UtilService,
  ) {}

  async getRoomList(
    getRoomListDto: GetRoomListDto,
  ): Promise<ResponseData<GetRoomListResponseDto>> {
    const { userId } = getRoomListDto;

    const roomUserList = await this.roomUserRepository.findRoomList(userId);
    const getRoomListResponseDto = new GetRoomListResponseDto();

    for (const roomUser of roomUserList) {
      const { sender, recipient } = roomUser;
      const partnerId = sender.id !== userId ? sender.id : recipient.id;
      const chat = await this.chatRepository.findByRoomName(roomUser.roomName);
      const partner = await this.userRepository.findUser(partnerId);

      getRoomListResponseDto.roomList.push({
        name: roomUser?.roomName ?? null,
        hasNewMessage: chat?.isRead ?? false,
        lastMessage: chat?.message ?? null,
        partner: {
          id: partner?.id ?? null,
          nickname: partner?.nickname ?? null,
          imageUrl: partner?.userImage?.[0]?.image?.url ?? null,
        },
      });
    }

    const resData: ResponseData<GetRoomListResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getRoomListResponseDto,
    };
    return resData;
  }

  async getRoomNameList(userId: number): Promise<string[]> {
    const roomUserList = await this.roomUserRepository.findRoomList(userId);

    const roomNameList =
      roomUserList?.map((roomUser) => roomUser.roomName) ?? null;

    return roomNameList;
  }

  async createRoom(
    senderId: number,
    recipientId: number,
  ): Promise<CreateRoomResponseDto> {
    const hasRoomUser = await this.roomUserRepository.findBySenderAndRecipient(
      senderId,
      recipientId,
    );

    if (hasRoomUser) {
      const createRoomResponseDto = new CreateRoomResponseDto();
      createRoomResponseDto.roomUser = hasRoomUser;
      createRoomResponseDto.hasRoomUser = true;
      return createRoomResponseDto;
    }

    const roomName = this.utilService.uuidGenerator.generate();
    const roomUser = await this.roomUserRepository.createRoomUser(
      senderId,
      roomName,
    );

    const createRoomResponseDto = new CreateRoomResponseDto();
    createRoomResponseDto.roomUser = roomUser;
    createRoomResponseDto.hasRoomUser = false;

    return createRoomResponseDto;
  }

  async joinRoom(recipientId: number, roomName: string): Promise<RoomUser> {
    const roomUser = await this.roomUserRepository.findOneBy({ roomName });

    if (!roomUser) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const recipient = new User();
    recipient.id = recipientId;

    roomUser.recipient = recipient;

    const createdRoomUser = await this.roomUserRepository.save(roomUser);
    return createdRoomUser;
  }
}
