import { Controller, Get, Inject } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}
}
