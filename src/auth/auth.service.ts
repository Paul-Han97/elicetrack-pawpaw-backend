import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { SendVerificationEmailDto } from './dto/send-verification-email.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    
    private readonly utilService: UtilService,
    private readonly mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseData<LoginResponseDto>> {
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

    const resData: ResponseData<LoginResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        user: {
          id: user.id,
          role: user.role.type,
          canWalkingMate: user.canWalkingMate,
        },
      },
    };

    return resData;
  }

  async sendVerificationEmail(
    sendVerificationEmailDto: SendVerificationEmailDto,
  ): Promise<ResponseData> {
    const reciever = sendVerificationEmailDto.email;

    // (max - min) + min
    const verificationCode = Math.floor(
      Math.random() * (99999 - 20000) + 10000,
    );

    const template = `<div style="margin: 0 auto; width: 200px; height: 300px;">
        <span style="display: block; text-align:center;">포포</span>
        <span style="display: block; text-align:center;">인증코드</span>
        <span style="display: block; text-align:center; margin-top: 10px; font-size: larger; font-weight: bold; letter-spacing: 5px;">${verificationCode}</span>
    </div>`;

    const result = await this.mailerService.sendMail({
      to: reciever,
      subject: '포포 인증코드 입니다.',
      html: template,
    });

    if (!result) {
      throw new InternalServerErrorException(ERROR_MESSAGE.FAILED_SEND_EMAIL);
    }

    await this.cacheManager.del(sendVerificationEmailDto.email);
    await this.cacheManager.set(reciever, verificationCode);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }
}
