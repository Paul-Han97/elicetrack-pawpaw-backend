import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './common/configs/module.option';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    CacheModule.register({
      // 5분
      ttl: 1000 * 60 * 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
