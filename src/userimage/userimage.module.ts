import { Module } from '@nestjs/common';
import { UserImageController } from './userimage.controller';
import { UserImageService } from './userimage.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserImageRepository } from './userimage.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserImageRepository])],
  controllers: [UserImageController],
  providers: [UserImageService],
})
export class UserImageModule {}
