import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { RoomUserController } from './room-user.controller';
import { RoomUserRepository } from './room-user.repository';
import { RoomUserService } from './room-user.service';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([RoomUserRepository])],
  controllers: [RoomUserController],
  providers: [RoomUserService],
})
export class RoomUserModule {}
