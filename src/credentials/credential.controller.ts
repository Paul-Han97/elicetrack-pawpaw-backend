import { Controller, Inject } from '@nestjs/common';
import { ICredentialService } from './interfaces/credential.service.interface';
import { CredentialService } from './credential.service';

@Controller('credentials')
export class CredentialController {
  constructor(
    @Inject(CredentialService)
    private readonly credentialService: ICredentialService,
  ) {}
}
