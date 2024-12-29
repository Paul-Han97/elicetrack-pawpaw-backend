import { Global, Module } from '@nestjs/common';
import { PasswordManager } from './password-manager.util';
import { UtilService } from './util.service';
import { UuidGenerator } from './uuid-generator.util';

@Global()
@Module({
  providers: [UtilService, PasswordManager, UuidGenerator],
  exports: [UtilService],
})
export class UtilModule {}
