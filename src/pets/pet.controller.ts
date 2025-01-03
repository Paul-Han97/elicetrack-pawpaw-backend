import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { IPetService } from './interfaces/pet.service.interface';
import { PetService } from './pet.service';
import { Request } from 'express';
import { Auth } from 'src/common/guards/auth.decorator';

@Controller('pets')
export class PetController {
  constructor(
    @Inject(PetService)
    private readonly petService: IPetService,
  ) {}

  @ApiOperation({
    summary: '반려동물의 정보를 작성 합니다.',
    description: `
      - Body로 받은 데이터를 기반으로 반려동물 정보를 작성 합니다.`,
  })
  @ApiOkResponse()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Auth()
  @Post()
  async createPet(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
    @Body() createPetDto: CreatePetDto,
  ) {
    const userId = req.session.user.id;
    createPetDto.userId = userId;
    createPetDto.image = image;

    const result = await this.petService.createPet(createPetDto);

    return result;
  }

  @ApiOperation({
    summary: '반려동물의 정보를 수정 합니다.',
    description: `
    - Body로 받은 데이터를 기반으로 수정 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '반려동물의 id',
  })
  @ApiCreatedResponse()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updatePetDto(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: number,
    @Req() req: Request,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    const userId = req.session.user.id;
    updatePetDto.userId = userId;
    updatePetDto.image = image;
    updatePetDto.id = id;

    const result = await this.petService.updatePet(updatePetDto);

    return result;
  }

  @ApiOperation({
    summary: '반려동물을 삭제 합니다.',
    description: `
    - 반려동물의 ID를 전달받아 해당 데이터를 삭제 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '반려동물의 ID',
  })
  @Delete(':id')
  async deletePet(@Param('id') id: number) {
    const result = await this.petService.deletePet(id);

    return result;
  }
}
