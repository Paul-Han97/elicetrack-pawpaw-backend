import { Module } from '@nestjs/common';
import { BoardCategoryController } from './board-category.controller';
import { BoardCategoryService } from './board-category.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { BoardCategoryRepository } from './board-category.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([BoardCategoryRepository])],
  controllers: [BoardCategoryController],
  providers: [BoardCategoryService],
})
export class BoardCategoryModule {}
