import { ApiProperty } from '@nestjs/swagger';

export class UpdateOneDto {
  @ApiProperty({
    description: '댓글의 내용',
  })
  content: string;
}
