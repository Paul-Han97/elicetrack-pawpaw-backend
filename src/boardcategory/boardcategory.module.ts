import { Module } from '@nestjs/common';
import { BoardCategoryController } from './boardcategory.controller';
import { BoardCategoryService } from './boardcategory.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardCategoryRepository } from './boardcategory.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardCategoryRepository])],
  controllers: [BoardCategoryController],
  providers: [BoardCategoryService],
})
export class BoardCategoryModule {}
