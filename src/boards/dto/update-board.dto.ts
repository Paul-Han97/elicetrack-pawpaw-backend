import { ApiProperty } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends CreateBoardDto {}

export class UpdateBoardResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
  })
  id: number;
}
