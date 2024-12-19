import { Module } from '@nestjs/common';
import { UserLocationService } from './userlocation.service';
import { UserLocationController } from './userlocation.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';

import { UserLocationRepository } from './userlocation.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserLocationRepository])],
  controllers: [UserLocationController],
  providers: [UserLocationService],
})
export class UserLocationModule {}
