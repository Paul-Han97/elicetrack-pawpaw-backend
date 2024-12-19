import { Repository } from 'typeorm';
import { LoginMethod } from '../entities/login-method.entity';

export interface ILoginMethodRepository extends Repository<LoginMethod> {}
