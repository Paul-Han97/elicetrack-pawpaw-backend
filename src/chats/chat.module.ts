import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { CounterRepository } from 'src/counters/counter.repository';
import { Counter, CounterSchema } from 'src/counters/schemas/counter.schema';
import { NotificationRepository } from 'src/notifications/notification.repository';
import { RoomUserRepository } from 'src/room-user/room-user.repository';
import { RoomUserService } from 'src/room-user/room-user.service';
import { UserRepository } from 'src/users/user.repository';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      RoomUserRepository,
      NotificationRepository,
      UserRepository,
    ]),
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [],
  providers: [
    ChatGateway,
    ChatService,
    RoomUserService,
    ChatRepository,
    CounterRepository,
  ],
})
export class ChatModule {}
