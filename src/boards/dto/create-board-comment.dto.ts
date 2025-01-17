import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsString } from 'class-validator';

export class CreateBoardCommentDto {
  @ApiProperty({
    description: '댓글의 내용',
  })
  @IsString()
  @IsByteLength(0, 500)
  content: string;

  id: number;

  userId: number;
}

export class CreateBoardCommentResponseDto {
  id: number;
}
