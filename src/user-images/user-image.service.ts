import { Inject, Injectable } from '@nestjs/common';
import { CreateUserimageDto } from './dto/create-userimage.dto';
import { UpdateUserimageDto } from './dto/update-userimage.dto';
import { UserImageRepository } from './user-image.repository';
import { IUserImageRepository } from './interface/user-image.repository.interface';
import { IUserImageService } from './interface/user-image.service.interface';

@Injectable()
export class UserImageService implements IUserImageService {
  constructor(
    @Inject(UserImageRepository)
    private readonly userImageRepository: IUserImageRepository,
  ) {}
}
