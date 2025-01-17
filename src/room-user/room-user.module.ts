import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRepository } from 'src/chats/chat.repository';
import { Chat, ChatSchema } from 'src/chats/schemas/chat.schema';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { NotificationRepository } from 'src/notifications/notification.repository';
import { UserRepository } from 'src/users/user.repository';
import { RoomUserController } from './room-user.controller';
import { RoomUserRepository } from './room-user.repository';
import { RoomUserService } from './room-user.service';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      RoomUserRepository,
      NotificationRepository,
      UserRepository,
    ]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [RoomUserController],
  providers: [RoomUserService, ChatRepository],
  exports: [RoomUserService],
})
export class RoomUserModule {}
