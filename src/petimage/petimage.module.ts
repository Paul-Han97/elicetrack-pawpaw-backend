import { Module } from '@nestjs/common';

import { PetImageController } from './petimage.controller';
import { PetImageService } from './petimage.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { PetImageRepository } from './petimage.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([PetImageRepository])],
  controllers: [PetImageController],
  providers: [PetImageService],
})
export class PetImageModule {}
