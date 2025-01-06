import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ImageRepository } from 'src/images/image.repository';
import { BoardImageRepository } from 'src/board-images/board-image.repository';
import { ImageService } from 'src/images/image.service';
import { CommentRepository } from 'src/comments/comment.repository';
import { UserBoardLikeRepository } from 'src/user-board-likes/user-board-like.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardRepository, ImageRepository, BoardImageRepository, CommentRepository, UserBoardLikeRepository])],
  controllers: [BoardController],
  providers: [BoardService, ImageService],
})
export class BoardModule {}
