import { ResponseData } from 'src/common/types/response.type';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { SendVerificationEmailDto } from '../dto/send-verification-email.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<ResponseData<LoginResponseDto>>;
  sendVerificationEmail(sendVerificationEmailDto: SendVerificationEmailDto): Promise<ResponseData>
}
