import { Controller, Inject } from '@nestjs/common';
import { IGenderService } from './interfaces/gender.service.interface';
import { GenderService } from './gender.service';

@Controller('genders')
export class GenderController {
  constructor(
    @Inject(GenderService)
    private readonly genderService: IGenderService,
  ) {}
}
