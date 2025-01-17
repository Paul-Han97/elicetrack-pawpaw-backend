import { ResponseData } from 'src/common/types/response.type';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { SendTemporaryPasswordEmailDto } from '../dto/send-temporary-password-email.dto';
import { SendVerificationEmailDto } from '../dto/send-verification-email.dto';
import { ValidateVerificationDto } from '../dto/validate-verifcation-code.dto';
import { KakaoLoginDto } from '../dto/login-kakao-redirect.dto';

export interface IAuthService {
  kakaoLogin(kakaoLoginDto: KakaoLoginDto): Promise<ResponseData<LoginResponseDto>>;
  login(loginDto: LoginDto): Promise<ResponseData<LoginResponseDto>>;
  register(registerDto: RegisterDto): Promise<ResponseData>;
  sendVerificationEmail(
    sendVerificationEmailDto: SendVerificationEmailDto,
  ): Promise<ResponseData>;
  validateVerificationCode(
    validateVerificationCodeDto: ValidateVerificationDto,
  ): Promise<ResponseData>;
  sendTemporaryPasswordEmail(
    sendTemporaryPasswordEmailDto: SendTemporaryPasswordEmailDto,
  ): Promise<ResponseData>;
}
