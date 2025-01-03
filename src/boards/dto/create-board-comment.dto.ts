import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardCommentDto {
  @ApiProperty({
    description: '댓글의 내용',
  })
  content: string;

  id: number;

  userId: number;
}

export class CreateBoardCommentResponseDto {
  id: number;
}
