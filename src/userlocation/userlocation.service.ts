import { Inject, Injectable } from '@nestjs/common';
import { CreateUserlocationDto } from './dto/create-userlocation.dto';
import { UpdateUserlocationDto } from './dto/update-userlocation.dto';
import { UserLocationRepository } from './userlocation.repository';
import { IUserLocationRepository } from './interface/userlocation.repository.interface';

@Injectable()
export class UserLocationService {
  constructor(
    @Inject(UserLocationRepository)
    private readonly userLocationRepository: IUserLocationRepository,
  ) {}
}
