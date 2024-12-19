import { Module } from '@nestjs/common';
import { BoardImageService } from './boardimage.service';

import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardImageRepository } from './boardimage.repository';
import { BoardImageController } from './boardimage.controller';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardImageRepository])],
  controllers: [BoardImageController],
  providers: [BoardImageService],
})
export class BoardImageModule {}
