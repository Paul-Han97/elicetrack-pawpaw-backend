import { ApiProperty } from '@nestjs/swagger';

export class DeleteOneResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;
}
