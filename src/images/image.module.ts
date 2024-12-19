import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([ImageRepository])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
