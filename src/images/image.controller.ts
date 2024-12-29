import { Controller, Inject } from '@nestjs/common';
import { ImageService } from './image.service';
import { IImageService } from './interface/image.service.interface';

@Controller('images')
export class ImageController {
  constructor(
    @Inject(ImageService)
    private readonly imageService: IImageService,
  ) {}
}
