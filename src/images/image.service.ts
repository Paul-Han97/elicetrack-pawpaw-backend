import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './image.repository';
import { IImageRepository } from './interface/image.repository.interface';

@Injectable()
export class ImageService {
  constructor(
    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,
  ) {}
}
