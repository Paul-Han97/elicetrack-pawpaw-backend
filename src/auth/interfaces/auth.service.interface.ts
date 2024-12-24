import { ResponseData } from 'src/common/types/response.type';
import { LoginDto } from '../dto/login.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<ResponseData>;
}
