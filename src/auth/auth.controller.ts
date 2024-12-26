import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { HTTP_STATUS } from 'src/common/constants';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SendTemporaryPasswordEmailDto } from './dto/send-temporary-password-email.dto';
import { SendVerificationEmailDto } from './dto/send-verification-email.dto';
import { ValidateVerficationDto } from './dto/validate-verifcation-code.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {}

  @ApiOperation({
    summary: '서비스에 로그인을 진행 합니다.',
    description: `
    - 서비스에 로그인을 진행 합니다.
    - password: 아래의 조건을 충족해야 합니다.
    - 최소 길이: 8
    - 소문자: 1개 이상
    - 대문자: 1개 이상
      - 숫자: 1개 이상
      - 특수문자: 1개 이상`,
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @HttpCode(HTTP_STATUS.OK)
  @Post('login')
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    req.session.user = {
      id: result.data.user.id,
      role: result.data.user.role,
    };

    return result;
  }

  @ApiOperation({
    summary: '서비스에 회원가입을 진행 합니다.',
    description: `
    - 서비스에 로그인을 진행 합니다.
    - email: 이메일 형식을 충족해야 합니다.
    - password: 아래의 조건을 충족해야 합니다.
      - 최소 길이: 8
      - 소문자: 1개 이상
      - 대문자: 1개 이상
      - 숫자: 1개 이상
      - 특수문자: 1개 이상
    - name: 최소 1글자 최대 30글자를 충족해야 한다.
    - nickname: 최소 1글자 최대 30글자를 충족해야 한다.`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post('register')
  async register(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
    @Body() registerDto: RegisterDto,
  ) {}

  @ApiOperation({
    summary: '사용자의 이메일로 인증 코드를 전송 합니다.',
    description: `
    - 사용자의 이메일로 인증 코드를 전송 합니다.
    - 서버 캐시에 인증코드를 저장 합니다.`,
  })
  @HttpCode(HTTP_STATUS.OK)
  @Post('send-verification-email')
  async sendVerificationEmail(
    @Body() sendVerificationEmailDto: SendVerificationEmailDto,
  ) {}

  @ApiOperation({
    summary: '전송된 인증코드를 확인 합니다.',
    description: `
    - 이메일을 이용하여 서버 캐시에 저장된 인증코드를 조회 합니다.
    - 서버 캐시에 저장되있는 인증코드와 전송된 인증코드를 비교하여
    true를 반환하면 해당 캐시 데이터는 삭제 됩니다.`,
  })
  @HttpCode(HTTP_STATUS.OK)
  @Post('validate-verification-code')
  async validateVerificationCode(
    @Body() validateVerficationDto: ValidateVerficationDto,
  ) {}

  @ApiOperation({
    summary: '사용자에게 임시 비밀번호 발급 메일을 전송 합니다.',
    description: `
    - 사용자에게 임시 비밀번호를 발급 합니다.
    - 발급된 비밀번호로 사용자의 비밀번호가 변경 됩니다.
    - 사용자는 로그인할 때 발급 받은 임시 비밀번호로 로그인 해야 합니다.`,
  })
  @HttpCode(HTTP_STATUS.OK)
  @Post('send-temporary-password-email')
  async sendTemporaryPasswordEmail(
    @Body() sendTemporaryPasswordEmailDto: SendTemporaryPasswordEmailDto,
  ) {}
}
