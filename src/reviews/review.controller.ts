import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateOneDto } from './dto/update-one.dto';
import { IReviewService } from './interfaces/review.service.interface';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(
    @Inject(ReviewService)
    private readonly reviewService: IReviewService,
  ) {}

  @ApiOperation({
    summary: '리뷰를 조회 합니다.',
    description: `
    - 리뷰의 id를 파라미터로 받습니다.
    - 리뷰의 제목과 내용 그리고 좋아요 상태를 작성할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '리뷰의 id',
  })
  @ApiOkResponse({
    type: GetReviewDto,
  })
  @Get(':id')
  async getReview(@Param('id') id: number) {}

  @ApiOperation({
    summary: '작성한 리뷰를 수정 합니다.',
    description: `
    - 리뷰의 id를 파라미터로 받습니다.
    - 리뷰의 제목과 내용 그리고 좋아요 상태를 수정할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '리뷰의 id',
  })
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateOneDto: UpdateOneDto,
  ) {}

  @ApiOperation({
    summary: '리뷰를 삭제 합니다.',
    description: `
    - id를 전달받아 리뷰를 삭제 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '리뷰의 id',
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {}
}
