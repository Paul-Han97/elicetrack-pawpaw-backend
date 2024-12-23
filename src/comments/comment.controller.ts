import { Body, Controller, Delete, Inject, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-one.dto';
import { ICommentService } from './interface/comment.service.interface';

@Controller('comments')
export class CommentController {
  constructor(
    @Inject(CommentService)
    private readonly commentService: ICommentService,
  ) {}

  @ApiOperation({
    summary: '댓글을 수정 합니다.',
    description: `
    - 댓글의 ID를 입력 받아 수정 합니다.
    - 내용을 수정할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '댓글의 ID',
  })
  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {}

  @ApiOperation({
    summary: '댓글을 삭제 합니다.',
    description: `
    - 댓글의 ID를 입력 받아 삭제 합니다.
    `,
  })
  @ApiParam({
    name: 'id',
    description: '댓글의 ID',
  })
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {}
}
