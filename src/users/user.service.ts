import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
}
