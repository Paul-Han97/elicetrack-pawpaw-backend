import { Controller, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PLACE_API, SUCCESS_MESSAGE } from 'src/common/constants';

@Controller('crons')
export class CronController {
  constructor(private scheduler: SchedulerRegistry) {}

  @Post('start-places-api')
  start() {
    const job = this.scheduler.getCronJob(PLACE_API);

    job.start();
    console.log('start!!', job.lastDate());
    return {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };
  }

  @Post('stop-places-api')
  stop() {
    const job = this.scheduler.getCronJob(PLACE_API);

    job.stop();
    console.log('stopped!!', job.lastDate());

    return {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };
  }
}
