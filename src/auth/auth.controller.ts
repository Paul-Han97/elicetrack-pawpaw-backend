import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {}
}
