import { Module } from '@nestjs/common';
import { UserImageController } from './user-image.controller';
import { UserImageService } from './user-image.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserImageRepository } from './user-image.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserImageRepository])],
  controllers: [UserImageController],
  providers: [UserImageService],
})
export class UserImageModule {}
