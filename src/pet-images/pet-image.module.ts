import { Module } from '@nestjs/common';

import { PetImageController } from './pet-image.controller';
import { PetImageService } from './pet-image.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { PetImageRepository } from './pet-image.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([PetImageRepository])],
  controllers: [PetImageController],
  providers: [PetImageService],
})
export class PetImageModule {}
