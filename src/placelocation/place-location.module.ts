import { Module } from '@nestjs/common';
import { PlaceLocationService } from './place-location.service';
import { PlaceLocationController } from './place-location.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { PlaceLocationRepository } from './place-location.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([PlaceLocationRepository])],
  controllers: [PlaceLocationController],
  providers: [PlaceLocationService],
})
export class PlaceLocationModule {}
