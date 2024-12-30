import { ApiProperty } from '@nestjs/swagger';
import { SendVerificationEmailDto } from './send-verification-email.dto';
import { IsString } from 'class-validator';

export class ValidateVerificationDto extends SendVerificationEmailDto {
  @ApiProperty({
    description: '이메일로 전송된 인증 코드',
  })
  @IsString()
  verificationCode: string;
}
