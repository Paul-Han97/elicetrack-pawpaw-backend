import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './image.repository';
import { IImageRepository } from './interface/image.repository.interface';
import { IImageService } from './interface/image.service.interface';

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,
  ) {}
}
