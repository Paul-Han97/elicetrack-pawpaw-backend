import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { GenderRepository } from 'src/genders/gender.repository';
import { PetSizeRepository } from 'src/pet-sizes/pet-size..repository';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import { PetService } from './pet.service';
import { ImageRepository } from 'src/images/image.repository';
import { PetImageRepository } from 'src/pet-images/pet-image.repository';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      PetRepository,
      GenderRepository,
      PetSizeRepository,
      ImageRepository,
      PetImageRepository
    ]),
  ],
  controllers: [PetController],
  providers: [PetService, ImageService],
})
export class PetModule {}
