import { Inject, Injectable } from '@nestjs/common';
import { CredentialRepository } from './credential.repository';
import { ICredentialRepository } from './interfaces/credential.repository.interface';
import { ICredentialService } from './interfaces/credential.service.interface';

@Injectable()
export class CredentialService implements ICredentialService {
  constructor(
    @Inject(CredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}
}
