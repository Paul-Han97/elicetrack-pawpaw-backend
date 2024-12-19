import { Controller, Inject } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}
}
