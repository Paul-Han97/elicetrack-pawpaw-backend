import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsString } from 'class-validator';

export class UpdateBoardCommentDto {
  @ApiProperty({
    description: '댓글의 내용',
  })
  @IsString()
  @IsByteLength(0, 500)
  content: string;

  id: number;

  commentId: number;

  userId: number;
}

export class UpdateBoardcommentResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
  })
  id: number;
}
