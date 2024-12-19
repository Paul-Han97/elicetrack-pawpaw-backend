import { Inject, Injectable } from '@nestjs/common';
import { CreateUserlocationDto } from './dto/create-userlocation.dto';
import { UpdateUserlocationDto } from './dto/update-userlocation.dto';
import { UserLocationRepository } from './user-location.repository';
import { IUserLocationRepository } from './interface/user-location.repository.interface';
import { IUserLocationService } from './interface/user-location.service.interface';

@Injectable()
export class UserLocationService implements IUserLocationService {
  constructor(
    @Inject(UserLocationRepository)
    private readonly userLocationRepository: IUserLocationRepository,
  ) {}
}
