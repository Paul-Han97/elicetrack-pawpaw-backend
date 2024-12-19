import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from './interfaces/role.repository.interface';
import { IRoleService } from './interfaces/role.service.interface';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject(RoleRepository)
    private readonly roleRepository: IRoleRepository,
  ) {}
}
