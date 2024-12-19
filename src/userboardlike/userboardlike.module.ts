import { Module } from '@nestjs/common';

import { UserBoardLikeController } from './userboardlike.controller';
import { UserBoardLikeService } from './userboardlike.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';

import { UserBoardLikeRepository } from './userboardlike.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserBoardLikeRepository])],
  controllers: [UserBoardLikeController],
  providers: [UserBoardLikeService],
})
export class UserBoardLikeModule {}
