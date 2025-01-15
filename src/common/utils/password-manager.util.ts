import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs'
import { ENV_KEYS } from '../constants';

@Injectable()
export class PasswordManager {
  private readonly PASSWORD_STRING: string;
  private readonly PASSWORD_SPECIAL: string;
  constructor(private readonly configService: ConfigService) {
    this.PASSWORD_STRING = this.configService.get<string>(ENV_KEYS.PASSWORD_STRING);
    this.PASSWORD_SPECIAL = this.configService.get<string>(ENV_KEYS.PASSWORD_SPECIAL);
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);

  }

  generate(): string {
    const passwordLength = this.PASSWORD_STRING.length;
    const maxLength = passwordLength / 4;
    
    let password = this.PASSWORD_SPECIAL;
    for(let i = 0; i < maxLength; i++) {
      const init = Math.floor(Math.random() * 100 + 1);
      const index = init % passwordLength;
      password += this.PASSWORD_STRING[index];
    }

    return password;
  }
}