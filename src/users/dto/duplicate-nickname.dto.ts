import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class DuplicateNicknameQueryDto {
  @ApiProperty({
    description: '사용자의 닉네임',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  nickname: string;
}
