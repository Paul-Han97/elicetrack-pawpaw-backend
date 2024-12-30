import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import {
  EMAIL_TEMPLATE_CLOSER,
  EMAIL_TEMPLATE_OPENER,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { ICredentialRepository } from 'src/credentials/interfaces/credential.repository.interface';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { SendTemporaryPasswordEmailDto } from './dto/send-temporary-password-email.dto';
import { SendVerificationEmailDto } from './dto/send-verification-email.dto';
import { ValidateVerificationDto } from './dto/validate-verifcation-code.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(CredentialRepository)
    private readonly credentialRepository: ICredentialRepository,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

    private readonly utilService: UtilService,
    private readonly mailerService: MailerService,
  ) {}

  async validateVerificationCode(
    validateVerificationCodeDto: ValidateVerificationDto,
  ): Promise<ResponseData> {
    const { email, verificationCode } = validateVerificationCodeDto;
    const cachedCode = await this.cacheManager.get<string>(email);

    if (!cachedCode) {
      throw new BadRequestException(ERROR_MESSAGE.NOT_VALID_REQUEST);
    }

    if (cachedCode !== verificationCode) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    await this.cacheManager.set(email, true);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

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

    const template = `${EMAIL_TEMPLATE_OPENER}${verificationCode}${EMAIL_TEMPLATE_CLOSER}`;

    const result = await this.mailerService.sendMail({
      to: reciever,
      subject: '포포 인증코드',
      html: template,
    });

    if (!result) {
      throw new InternalServerErrorException(ERROR_MESSAGE.FAILED_SEND_EMAIL);
    }

    await this.cacheManager.set(reciever, verificationCode.toString());

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async sendTemporaryPasswordEmail(
    sendTemporaryPasswordEmailDto: SendTemporaryPasswordEmailDto,
  ): Promise<ResponseData> {
    const { email } = sendTemporaryPasswordEmailDto;

    const isValidEmail = await this.cacheManager.get<boolean>(email);

    if (!isValidEmail) throw new ForbiddenException(ERROR_MESSAGE.FORBIDDEN);

    const user = await this.userRepository.findUserCredentialByEmail(email);

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    await this.dataSource.transaction<void>(
      async (manager: EntityManager): Promise<void> => {
        const credentialRepository = manager.withRepository(
          this.credentialRepository,
        );

        const temporaryPassword = this.utilService.passwordManager.generate();
        const credential = user.credential[0];
        credential.password =
          await this.utilService.passwordManager.hash(temporaryPassword);

        await credentialRepository.save(credential, { reload: false });

        const mailResult = await this.mailerService.sendMail({
          to: email,
          subject: '포포 임시 비밀번호 발급',
          text: `임시 비밀번호: ${temporaryPassword}`,
        });

        if (!mailResult) {
          throw new InternalServerErrorException(
            ERROR_MESSAGE.FAILED_SEND_EMAIL,
          );
        }
      },
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }
}
