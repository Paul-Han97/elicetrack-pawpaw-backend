import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
}
