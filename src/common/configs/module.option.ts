import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    APP_PORT: Joi.number().port().default(3000),
    APP_ENV: Joi.string().valid('prod', 'dev').insensitive(),
  }),
  isGlobal: true,
};
