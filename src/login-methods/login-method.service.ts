import { Inject, Injectable } from '@nestjs/common';
import { LoginMethodRepository } from './login-method.repository';
import { ILoginMethodRepository } from './interfaces/login-method.repository.interface';
import { LoginMethod } from './entities/login-method.entity';
import { ILoginMethodService } from './interfaces/login-method.service.interface';

@Injectable()
export class LoginMethodService implements ILoginMethodService {
  constructor(
    @Inject(LoginMethodRepository)
    private readonly loginMethodRepository: ILoginMethodRepository,
  ) {}
}
