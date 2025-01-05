import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
