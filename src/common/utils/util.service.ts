import { Injectable } from '@nestjs/common';
import { PasswordManager } from './password-manager.util';

@Injectable()
export class UtilService {
  constructor(private readonly passwordManager: PasswordManager) {}
}
