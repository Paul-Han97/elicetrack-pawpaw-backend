import { ResponseData } from 'src/common/types/response.type';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { SendVerificationEmailDto } from '../dto/send-verification-email.dto';
import { ValidateVerificationDto } from '../dto/validate-verifcation-code.dto';
import { SendTemporaryPasswordEmailDto } from '../dto/send-temporary-password-email.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<ResponseData<LoginResponseDto>>;
  sendVerificationEmail(sendVerificationEmailDto: SendVerificationEmailDto): Promise<ResponseData>
  validateVerificationCode(validateVerificationCodeDto: ValidateVerificationDto): Promise<ResponseData>
  sendTemporaryPasswordEmail(sendTemporaryPasswordEmailDto: SendTemporaryPasswordEmailDto): Promise<ResponseData>
}
