import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: '댓글의 내용',
  })
  content: string;
}
