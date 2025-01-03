import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ImageRepository } from 'src/images/image.repository';
import { BoardImageRepository } from 'src/board-images/board-image.repository';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardRepository, ImageRepository, BoardImageRepository])],
  controllers: [BoardController],
  providers: [BoardService, ImageService],
})
export class BoardModule {}
