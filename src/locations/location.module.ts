import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { LocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([LocationRepository])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
