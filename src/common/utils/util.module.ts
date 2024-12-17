import { Global, Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { PasswordManager } from './password-manager.util';

@Global()
@Module({
  providers: [PasswordManager],
  exports: [UtilService],
})
export class UtilModule {}
