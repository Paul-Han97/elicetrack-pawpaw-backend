import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { IImageService } from './interface/image.service.interface';

@Controller('images')
export class ImageController {
  constructor(
    @Inject(ImageService)
    private readonly imageService: IImageService,
  ) {}
}
