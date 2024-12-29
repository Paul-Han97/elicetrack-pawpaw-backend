import { ResponseData } from 'src/common/types/response.type';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<ResponseData<LoginResponseDto>>;
}
