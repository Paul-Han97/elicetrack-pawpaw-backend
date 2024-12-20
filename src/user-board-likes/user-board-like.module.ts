import { Module } from '@nestjs/common';

import { UserBoardLikeController } from './user-board-like.controller';
import { UserBoardLikeService } from './user-board-like.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';

import { UserBoardLikeRepository } from './user-board-like.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserBoardLikeRepository])],
  controllers: [UserBoardLikeController],
  providers: [UserBoardLikeService],
})
export class UserBoardLikeModule {}
