import { Inject, Injectable } from '@nestjs/common';
import { CreateUserimageDto } from './dto/create-userimage.dto';
import { UpdateUserimageDto } from './dto/update-userimage.dto';
import { UserImageRepository } from './userimage.repository';
import { IUserImageRepository } from './interface/userimage.repository.interface';

@Injectable()
export class UserImageService {
  constructor(
    @Inject(UserImageRepository)
    private readonly userImageRepository: IUserImageRepository,
  ) {}
}
