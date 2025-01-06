import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/chats/schemas/chat.schema';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { NotificationRepository } from 'src/notifications/notification.repository';
import { RoomUserController } from './room-user.controller';
import { RoomUserRepository } from './room-user.repository';
import { RoomUserService } from './room-user.service';
import { ChatRepository } from 'src/chats/chat.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      RoomUserRepository,
      NotificationRepository,
    ]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [RoomUserController],
  providers: [RoomUserService],
  exports: [RoomUserService, ChatRepository],
})
export class RoomUserModule {}
