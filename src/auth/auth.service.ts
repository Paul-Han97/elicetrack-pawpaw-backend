import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { LoginDto } from './dto/login.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly utilService: UtilService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseData> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findUserCredentialByEmail(email);

    if (!user)
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_PASSWORD_NOT_MATCH);

    const isMathces = await this.utilService.passwordManager.compare(
      password,
      user.credential[0].password,
    );

    if (!isMathces)
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_PASSWORD_NOT_MATCH);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        user: {
          id: user.id,
          role: user.role.type,
        }
      },
    };
    return resData;
  }
}
