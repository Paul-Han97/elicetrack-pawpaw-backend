import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from './dto/get-my-board-list.dto';
import { GetMyPageResponseDto } from './dto/get-my-page.dto';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';
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
    summary: '닉네임 중복을 확인 합니다.',
    description: `
        - 닉네임 중복을 확인 합니다.`,
  })
  @ApiQuery({
    name: 'nickname',
    description: '사용자의 닉네임',
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
  ) {}

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
  ) {}

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
}
