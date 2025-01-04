import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class DuplicateEmailQueryDto {
  @ApiProperty({
    description: '사용자의 이메일',
  })
  @IsEmail()
  email: string;
}
