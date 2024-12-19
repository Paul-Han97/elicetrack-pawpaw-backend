import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardRepository])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
