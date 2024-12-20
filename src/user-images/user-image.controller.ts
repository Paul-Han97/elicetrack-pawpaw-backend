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

import { CreateUserimageDto } from './dto/create-userimage.dto';
import { UpdateUserimageDto } from './dto/update-userimage.dto';
import { UserImageService } from './user-image.service';
import { IUserImageService } from './interface/user-image.service.interface';

@Controller('user-images')
export class UserImageController {
  constructor(
    @Inject(UserImageService)
    private readonly userImageService: IUserImageService,
  ) {}
}
