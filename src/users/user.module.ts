import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
