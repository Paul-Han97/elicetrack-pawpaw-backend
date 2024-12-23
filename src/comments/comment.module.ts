import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
