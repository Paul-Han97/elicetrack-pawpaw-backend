import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from 'src/common/guards/auth.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import {
  CreatePlaceReviewDto,
  CreatePlaceReviewResponseDto,
} from './dto/create-place-review.dto';

import {
  DeletePlaceReviewDto,
  DeletePlaceReviewResponseDto,
} from './dto/delete-review.dto';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from './dto/get-nearby-place-list.dto';
import { GetPlaceReviewResponseDto } from './dto/get-place-review.dto';
import { GetPlaceResponseDto } from './dto/get-place.dto';
import {
  UpdatePlaceReviewDto,
  UpdatePlaceReviewResponseDto,
} from './dto/update-place-review.dto';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(
    @Inject(PlaceService)
    private readonly placeService: IPlaceService,
  ) {}

  @ApiOperation({
    summary: '시설물의 위치 정보를 조회 합니다.',
    description: `
    - 입력받은 현재위치와 카테고리 그리고 반경을 기준으로 조회 합니다.`,
  })
  @ApiOkResponse({
    type: GetNearbyPlaceListResponseDto,
  })
  @Get('nearby-place-list')
  @UseInterceptors(TransactionInterceptor)
  async getNearbyPlaceList(
    @Query() getNearbyPlaceListQueryDto: GetNearbyPlaceListQueryDto,
  ) {
    const result = await this.placeService.getNearbyPlaces(
      getNearbyPlaceListQueryDto,
    );

    return result;
  }

  @ApiOperation({
    summary: '시설물의 정보를 조회 합니다.',
    description: `
    - 입력받은 ID로 시설물의 데이터를 조회 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '시설물의 ID',
  })
  @ApiOkResponse({
    type: GetPlaceResponseDto,
  })
  @Get(':id')
  async getPlace(@Param('id') id: number) {
    const result = await this.placeService.getPlace(id);

    return { data: result };
  }

  @ApiOperation({
    summary: '시설물에 리뷰를 작성 합니다.',
    description: `
    - Place의 id를 입력받아 리뷰를 작성 합니다.
    - 제목과 내용을 입력할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: 'place의 id',
  })
  @ApiCreatedResponse({
    type: CreatePlaceReviewResponseDto,
  })
  @Auth()
  @Post(':id/reviews')
  async createPlaceReview(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() createPlaceReviewDto: CreatePlaceReviewDto,
  ) {
    createPlaceReviewDto.userId = req.session.user.id;
    createPlaceReviewDto.id = id;

    const result =
      await this.placeService.createPlaceReview(createPlaceReviewDto);
    return result;
  }

  @ApiOperation({
    summary: '리뷰를 조회 합니다.',
    description: `
    - 장소의 id를 파리미터로 받습니다.
    - 리뷰의 id를 파라미터로 받습니다.
    - 리뷰의 제목과 내용 그리고 좋아요 상태를 조회할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '장소의 ID',
  })
  @ApiParam({
    name: 'reviewId',
    description: '리뷰의 ID',
  })
  @ApiOkResponse({
    type: GetPlaceReviewResponseDto,
  })
  @Auth()
  @Get(':id/reviews/:reviewId')
  async getPlaceReview(
    @Param('id') id: number,
    @Param('reviewId') reviewId: number,
  ) {
    const result = await this.placeService.getPlaceReview({
      id,
      reviewId,
    });
    return result;
  }

  @ApiOperation({
    summary: '작성한 리뷰를 수정 합니다.',
    description: `
    - 리뷰의 id를 파라미터로 받습니다.
    - 리뷰의 제목과 내용 그리고 좋아요 상태를 수정할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '장소의 id',
  })
  @ApiParam({
    name: 'reviewId',
    description: '리뷰의 id',
  })
  @ApiOkResponse({
    type: UpdatePlaceReviewResponseDto,
  })
  @Auth()
  @Put(':id/reviews/:reviewId')
  async updateReview(
    @Req() req: Request,
    @Param('id') id: number,
    @Param('reviewId') reviewId: number,
    @Body() updatePlaceReviewDto: UpdatePlaceReviewDto,
  ) {
    const userId = req.session.user.id;

    updatePlaceReviewDto.id = id;
    updatePlaceReviewDto.reviewId = reviewId;
    updatePlaceReviewDto.userId = userId;

    const result =
      await this.placeService.updatePlaceReview(updatePlaceReviewDto);

    return result;
  }

  @ApiOperation({
    summary: '리뷰를 삭제 합니다.',
    description: `
    - id를 전달받아 리뷰를 삭제 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '장소의 id',
  })
  @ApiParam({
    name: 'reviewId',
    description: '리뷰의 id',
  })
  @ApiOkResponse({
    type: DeletePlaceReviewResponseDto,
  })
  @Delete(':id/reviews/:reviewId')
  async deleteReview(
    @Req() req: Request,
    @Param('id') id: number,
    @Param('reviewId') reviewId: number,
  ) {
    const userId = req.session.user.id;
    const deletePlaceReviewDto = new DeletePlaceReviewDto();
    deletePlaceReviewDto.id = id;
    deletePlaceReviewDto.reviewId = reviewId;
    deletePlaceReviewDto.userId = userId;

    const result = this.placeService.deletePlaceReview(deletePlaceReviewDto);

    return result;
  }
}
