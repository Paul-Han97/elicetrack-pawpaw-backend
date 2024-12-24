import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { HTTP_STATUS } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
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
    - password는 아래의 조건을 충족해야 한다.
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
  @Post()
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    req.session.user = {
      id: result.data.userId,
    };

    return result;
  }

  @Get()
  async getSessionId(@Req() req: Request) {
    const resData: ResponseData = {
      message: 'test',
      data: 'test',
    };
    return resData;
  }
}
