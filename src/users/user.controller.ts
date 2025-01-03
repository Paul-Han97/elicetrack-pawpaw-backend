import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/common/guards/auth.decorator';
import { ResponseData } from 'src/common/types/response.type';
import { DuplicateEmailQueryDto } from './dto/duplicate-email.dto';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from './dto/get-my-board-list.dto';
import { GetMyPageResponseDto } from './dto/get-my-page.dto';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';
import {
  GetNearbyUserListQueryDto,
  SaveUserLocationDto,
} from './dto/get-nearby-user-list.dto';
import { GetUserDto, GetUserResponseDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}

  @ApiOperation({
    summary: '주변 사용자 검색',
    description:
      '사용자의 위치를 기반으로 반경 내 walkmate가 true인 사용자 검색.',
  })
  @Auth()
  @Get('nearby-users-list')
  async getNearbyUsers(
    @Query() getNearbyUserListQueryDto: GetNearbyUserListQueryDto,
  ) {
    const result = this.userService.getNearbyUsers(getNearbyUserListQueryDto);

    return result;
  }

  @ApiOperation({
    summary: '이메일 중복을 확인 합니다.',
    description: `
    - 이메일 중복을 확인 합니다.`,
  })
  @ApiBadRequestResponse({
    description: '계정이 이미 존재할 때',
  })
  @Get('duplicate-email')
  async duplicateEmail(
    @Query() duplicateEmailQueryDto: DuplicateEmailQueryDto,
  ): Promise<ResponseData> {
    const result = await this.userService.checkDuplicateEmail(
      duplicateEmailQueryDto,
    );
    return result;
  }

  @ApiOperation({
    summary: '닉네임 중복을 확인 합니다.',
    description: `
        - 닉네임 중복을 확인 합니다.`,
  })
  @Get('duplicate-nickname')
  async duplicateNickname(
    @Query() duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData> {
    const result = await this.userService.checkDuplicateNickname(
      duplicateNicknameQueryDto,
    );

    return result;
  }

  @ApiOperation({
    summary: '사용자의 정보를 조회 합니다.',
    description: `
    - 사용자의 ID로 정보를 조회 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '사용자의 ID',
  })
  @ApiOkResponse({
    type: GetUserResponseDto,
  })
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const getUserDto = new GetUserDto();
    getUserDto.id = id;
    return await this.userService.getUser(getUserDto);
  }

  @ApiOperation({
    summary: '사용자와 반려동물의 정보를 조회 합니다.',
    description: `
    - 사용자의 닉네임과 산책메이트 기능 ON/OFF 여부를 조회 합니다.
    - 사용자의 반려동물들의 정보를 조회 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '사용자의 id',
  })
  @ApiResponse({
    type: GetMyPageResponseDto,
  })
  @Get(':id/my-pages')
  async getMyPage(@Param('id') id: number) {}

  @ApiOperation({
    summary: '사용자가 작성한 게시글 목록을 조회 합니다.',
    description: `
    - 사용자가 작성한 게시글 목록을 조회 합니다.`,
  })
  @ApiOkResponse({
    type: [GetMyBoardListResponseDto],
  })
  @Get(':id/boards')
  async getMyBoardList(
    @Query() paginationDto: PaginationDto,
    @Param('id') id: number,
  ) {
    const result = await this.userService.getMyBoardList(id, paginationDto);

    return result;
  }

  @ApiOperation({
    summary: '사용자가 작성한 리뷰 목록을 조회 합니다.',
    description: `
    - 사용자가 작성한 리뷰 목록을 조회 합니다.`,
  })
  @ApiOkResponse({
    type: [GetMyReviewListDto],
  })
  @Get(':id/reviews')
  async getMyReviewList(
    @Query() paginationDto: PaginationDto,
    @Param('id') id: number,
  ) {
    const result = await this.userService.getMyReviewList(id, paginationDto);

    return result;
  }

  @ApiOperation({
    summary: '사용자의 정보를 수정 합니다.',
    description: `
    - Body 데이터를 기준으로 사용자의 정보를 수정 합니다.`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  @ApiOkResponse()
  async updateUser(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {}

  @ApiOperation({
    summary: '사용자 위치 저장',
    description: '클라이언트에서 받은 사용자의 위치 데이터를 저장합니다.',
  })
  @Auth()
  @Post('location')
  async saveUserLocation(
    @Req() req: Request,

    @Body() saveUserLocationDto: SaveUserLocationDto,
  ) {
    const userId = req.session.user.id;
    saveUserLocationDto.id = userId;
    const result = this.userService.saveUserLocation(saveUserLocationDto);

    return result;
  }
}
