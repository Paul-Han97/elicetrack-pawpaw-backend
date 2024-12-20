import { Module } from '@nestjs/common';
import { BoardImageService } from './board-image.service';

import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardImageRepository } from './board-image.repository';
import { BoardImageController } from './board-image.controller';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardImageRepository])],
  controllers: [BoardImageController],
  providers: [BoardImageService],
})
export class BoardImageModule {}
