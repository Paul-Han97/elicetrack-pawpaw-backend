import { Repository } from 'typeorm';
import { Credential } from '../entities/credential.entity';

export interface ICredentialRepository extends Repository<Credential> {}
