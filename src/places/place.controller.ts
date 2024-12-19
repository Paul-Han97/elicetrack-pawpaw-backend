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
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interface/place.service.interface';

@Controller('places')
export class PlaceController {
  constructor(
    @Inject(PlaceService)
    private readonly placeService: IPlaceService,
  ) {}
}
