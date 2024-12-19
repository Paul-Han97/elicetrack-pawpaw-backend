import { Module } from '@nestjs/common';
import { PlaceLocationService } from './placelocation.service';
import { PlaceLocationController } from './placelocation.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { PlaceLocationRepository } from './placelocation.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([PlaceLocationRepository])],
  controllers: [PlaceLocationController],
  providers: [PlaceLocationService],
})
export class PlacelocationModule {}
