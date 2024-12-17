import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { HTTP_STATUS } from '../constants';
import { ResponseBody, ResponseData } from '../types/response.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((resData: ResponseData) => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;

        const body: ResponseBody = {
          body: {
            status: HTTP_STATUS[statusCode],
            message: resData.message,
            data: resData.data,
          },
        };

        return body;
      }),
    );
  }
}
