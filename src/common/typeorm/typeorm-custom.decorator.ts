import { SetMetadata } from '@nestjs/common';
import { CUSTOM_REPOSITORY } from '../constants';

export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(CUSTOM_REPOSITORY, entity);
}
