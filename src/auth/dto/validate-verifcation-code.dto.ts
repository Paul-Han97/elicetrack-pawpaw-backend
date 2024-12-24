import { ApiProperty } from '@nestjs/swagger';
import { SendVerificationEmailDto } from './send-verification-email.dto';

export class ValidateVerficationDto extends SendVerificationEmailDto {
  @ApiProperty({
    description: '이메일로 전송된 인증 코드',
  })
  verificationCode: string;
}
