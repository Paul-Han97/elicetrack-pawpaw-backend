import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DuplicateEmailQueryDto {
  @ApiProperty({
    description: '사용자의 이메일',
  })
  @IsString()
  email: string;
}
