import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { HTTP_STATUS } from '../constants';
import { ResponseBody } from '../types/response.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.log(`GlobalExceptionFilter 시작`);

    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    const isInternalServerError = !(exception instanceof HttpException);

    if (isInternalServerError) {
      this.logger.error((<Error>exception).stack);

      const body: ResponseBody = {
        body: {
          status: HTTP_STATUS['500'],
          message: (<Error>exception).message,
          data: null,
        },
      };

      this.logger.log(
        `GlobalExceptionFilter 종료`,
        `Result :\n${JSON.stringify(body, undefined, 2)}`,
      );

      res.status(500).json(body);
      return;
    }

    const statusCode = exception.getStatus();
    const message = (<any>exception.getResponse()).message;

    if (statusCode === 500) {
      this.logger.error(exception.message, exception.stack);
    }

    const body: ResponseBody = {
      body: {
        status: HTTP_STATUS[statusCode],
        message,
        data: null,
      },
    };

    this.logger.log(
      `GlobalExceptionFilter 종료`,
      `Result :\n${JSON.stringify(body, undefined, 2)}`,
    );

    res.status(statusCode).json(body);
  }
}
