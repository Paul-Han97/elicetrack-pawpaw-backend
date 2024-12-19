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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ILocationService } from './interface/location.service.interface';

@Controller('location')
export class LocationController {
  constructor(
    @Inject(LocationService)
    private readonly locationService: ILocationService,
  ) {}
}
