import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
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
  LOGIN_METHOD_TYPE_INDEX,
  ROLE_TYPE_INDEX,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { Credential } from 'src/credentials/entities/credential.entity';
import { ICredentialRepository } from 'src/credentials/interfaces/credential.repository.interface';
import { DeleteImageDto } from 'src/images/dto/delete-image.dto';
import { UploadImageDto } from 'src/images/dto/upload-image.dto';
import { Image } from 'src/images/entities/image.entity';
import { ImageRepository } from 'src/images/image.repository';
import { ImageService } from 'src/images/image.service';
import { IImageRepository } from 'src/images/interface/image.repository.interface';
import { IImageService } from 'src/images/interface/image.service.interface';
import { LoginMethod } from 'src/login-methods/entities/login-method.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserImage } from 'src/user-images/entities/user-image.entity';
import { IUserImageRepository } from 'src/user-images/interface/user-image.repository.interface';
import { UserImageRepository } from 'src/user-images/user-image.repository';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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

    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,

    @Inject(UserImageRepository)
    private readonly userImageRepository: IUserImageRepository,

    @Inject(ImageService)
    private readonly imageService: IImageService,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

    private readonly utilService: UtilService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto): Promise<ResponseData> {
    const { name, nickname, password, image, email } = registerDto;
    const uploadImageDto = new UploadImageDto();
    const tempDeleteImageDto = new DeleteImageDto();

    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const userRepository = manager.withRepository(this.userRepository);
        const credentialRepository = manager.withRepository(this.credentialRepository);
        const imageRepository = manager.withRepository(this.imageRepository);
        const userImageRepository = manager.withRepository(this.userImageRepository);

        const role = new Role();
        role.id = ROLE_TYPE_INDEX.USER;

        const newUser = new User();
        newUser.name = name;
        newUser.nickname = nickname;
        newUser.canWalkingMate = false;
        newUser.role = role;

        const createdUser = await userRepository.save(newUser);

        const loginMethod = new LoginMethod();
        loginMethod.id = LOGIN_METHOD_TYPE_INDEX.BASIC;

        const newCredential = new Credential();
        newCredential.username = email;
        newCredential.password = await this.utilService.passwordManager.hash(password);
        newCredential.loginMethod = loginMethod;
        newCredential.user = createdUser;
        newCredential.createdUser = createdUser.id.toString();
        
        await credentialRepository.save(newCredential, { reload: false });
        
        if(!image) {
          return;
        }

        uploadImageDto.entity.id = createdUser.id;
        uploadImageDto.entity.name = User.name;
        uploadImageDto.imageList.push(image);
        
        const createdImage = await this.imageService.uploadImageToS3(uploadImageDto);
        tempDeleteImageDto.filenameList.push(createdImage.imageList[0].filename);

        const newImage = new Image();
        newImage.url = createdImage.imageList[0].url;
        newImage.createdUser = createdUser.id.toString();
        
        const newUserImage = new UserImage();
        newUserImage.image = newImage;
        newUserImage.user = createdUser;
        newUserImage.createdUser = createdUser.id.toString();

        await imageRepository.save(newImage);
        await userImageRepository.save(newUserImage);
      });
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async validateVerificationCode(
    validateVerificationCodeDto: ValidateVerificationDto,
  ): Promise<ResponseData> {
    const { email, verificationCode } = validateVerificationCodeDto;
    const cachedCode = await this.cacheManager.get<string>(email);

    if (!cachedCode) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    if (cachedCode !== verificationCode) {
      throw new BadRequestException(ERROR_MESSAGE.NOT_VALID_REQUEST);
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
          nickname: user.nickname,
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

    if (!isValidEmail)
      throw new BadRequestException(ERROR_MESSAGE.NOT_VALID_REQUEST);

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
