import { Repository } from 'typeorm';
import { Gender } from '../entities/gender.entity';

export interface IGenderRepository extends Repository<Gender> {}
