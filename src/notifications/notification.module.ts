import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRepository } from 'src/chats/chat.repository';
import { Chat, ChatSchema } from 'src/chats/schemas/chat.schema';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { Counter, CounterSchema } from 'src/counters/schemas/counter.schema';
import { RoomRepository } from 'src/rooms/room.repository';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { CounterRepository } from 'src/counters/counter.repository';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([NotificationRepository, UserRepository]),
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ChatRepository, RoomRepository, CounterRepository],
})
export class NotificationModule {}
