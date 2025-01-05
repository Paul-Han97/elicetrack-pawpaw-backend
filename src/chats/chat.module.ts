import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterRepository } from 'src/counters/counter.repository';
import { Counter, CounterSchema } from 'src/counters/schemas/counter.schema';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { RoomUserRepository } from 'src/room-user/room-user.repository';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([RoomUserRepository]),
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [],
  providers: [
    ChatGateway,
    ChatService,
    ChatRepository,
    CounterRepository,
  ],
})
export class ChatModule {}
