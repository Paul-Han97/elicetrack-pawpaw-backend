import { Injectable } from '@nestjs/common';
import { PasswordManager } from './password-manager.util';

@Injectable()
export class UtilService {
  constructor(public readonly passwordManager: PasswordManager) {}
}
