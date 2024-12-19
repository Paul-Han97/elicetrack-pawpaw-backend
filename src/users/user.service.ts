import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
}
