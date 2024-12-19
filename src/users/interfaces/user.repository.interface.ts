import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface IUserRepository extends Repository<User> {}
