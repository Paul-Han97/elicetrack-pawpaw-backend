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

import { CreatePlacelocationDto } from './dto/create-placelocation.dto';
import { UpdatePlacelocationDto } from './dto/update-placelocation.dto';
import { PlaceLocationService } from './place-location.service';
import { IPlaceLocationService } from './interface/place-location.service.interface';

@Controller('place-locations')
export class PlaceLocationController {
  constructor(
    @Inject(PlaceLocationService)
    private readonly placelocationService: IPlaceLocationService,
  ) {}
}
