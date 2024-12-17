import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordManager {
  constructor() {}

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(
    password: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}