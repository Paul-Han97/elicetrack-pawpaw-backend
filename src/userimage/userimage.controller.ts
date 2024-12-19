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
import { UserImageService } from './userimage.service';
import { IUserImageService } from './interface/userimage.service.interface';

@Controller('userimage')
export class UserImageController {
  constructor(
    @Inject(UserImageService)
    private readonly userImageService: IUserImageService,
  ) {}
}
