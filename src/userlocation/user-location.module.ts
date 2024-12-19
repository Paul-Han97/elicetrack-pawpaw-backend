import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { UserLocationController } from './user-location.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';

import { UserLocationRepository } from './user-location.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserLocationRepository])],
  controllers: [UserLocationController],
  providers: [UserLocationService],
})
export class UserLocationModule {}
