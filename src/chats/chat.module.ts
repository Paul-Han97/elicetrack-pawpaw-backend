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
import { NotificationService } from 'src/notifications/notification.service';
import { UserService } from 'src/users/user.service';
import { ReviewRepository } from 'src/reviews/review.repository';
import { BoardRepository } from 'src/boards/board.repository';
import { ImageService } from 'src/images/image.service';
import { ImageRepository } from 'src/images/image.repository';
import { UserImageRepository } from 'src/user-images/user-image.repository';
import { LocationRepository } from 'src/locations/location.repository';
import { UserLocationRepository } from 'src/user-locations/user-location.repository';
import { CredentialRepository } from 'src/credentials/credential.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      RoomUserRepository,
      NotificationRepository,
      UserRepository,
      ReviewRepository,
      BoardRepository,
      ImageRepository,
      UserImageRepository,
      LocationRepository,
      UserLocationRepository,
      CredentialRepository,
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
    UserService,
    ImageService,
    RoomUserService,
    NotificationService,
    ChatRepository,
    CounterRepository,
  ],
})
export class ChatModule {}
