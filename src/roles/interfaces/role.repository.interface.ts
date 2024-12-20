import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

export interface IRoleRepository extends Repository<Role> {}
