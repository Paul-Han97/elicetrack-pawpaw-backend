import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, path } = req;
    const className = context.getClass().name;
    const functionName = context.getHandler().name;
    const name = `[${className}.${functionName}()]`
    this.logger.log(`${name} ${method} ${path}`);

    return next.handle().pipe(
      tap((data) => {
        this.logger.verbose(
          `${name} Result : \n` +
            `------------------------------------------------------------\n` +
            `${JSON.stringify(data, null, 2)}\n` +
            `------------------------------------------------------------`,
        );
      }),
    );
  }
}
