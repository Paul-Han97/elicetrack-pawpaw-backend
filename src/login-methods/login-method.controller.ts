import { Controller, Inject } from '@nestjs/common';
import { ILoginMethodService } from './interfaces/login-method.service.interface';
import { LoginMethodService } from './login-method.service';

@Controller('login-methods')
export class LoginMethodController {
  constructor(
    @Inject(LoginMethodService)
    private readonly loginMethodService: ILoginMethodService,
  ) {}
}
