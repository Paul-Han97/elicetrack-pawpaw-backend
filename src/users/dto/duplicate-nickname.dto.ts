import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DuplicateNicknameQueryDto {
  @ApiProperty({
    description: '사용자의 닉네임',
  })
  @IsString()
  nickname: string;
}
