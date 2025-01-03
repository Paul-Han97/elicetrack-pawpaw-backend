import { Injectable } from '@nestjs/common';
import { PasswordManager } from './password-manager.util';
import { UuidGenerator } from './uuid-generator.util';

@Injectable()
export class UtilService {
  constructor(
    public readonly passwordManager: PasswordManager,
    public readonly uuidGenerator: UuidGenerator,
  ) {}
}
