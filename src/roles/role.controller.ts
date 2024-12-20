import { Controller, Inject } from '@nestjs/common';
import { IRoleService } from './interfaces/role.service.interface';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(RoleService)
    private readonly roleService: IRoleService,
  ) {}
}
