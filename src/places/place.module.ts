import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([PlaceRepository])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
