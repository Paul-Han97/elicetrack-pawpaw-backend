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

import { CreateUserlocationDto } from './dto/create-userlocation.dto';
import { UpdateUserlocationDto } from './dto/update-userlocation.dto';
import { UserLocationService } from './userlocation.service';
import { IUserLocationService } from './interface/userlocation.service.interface';

@Controller('userlocation')
export class UserLocationController {
  constructor(
    @Inject(UserLocationService)
    private readonly userLocationService: IUserLocationService,
  ) {}
}
