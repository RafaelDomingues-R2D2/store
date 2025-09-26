import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequestWithUser } from 'src/modules/authentication/authentication/authentication.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<Request | RequestWithUser>();

    const response = contextHttp.getResponse<Response>();

    const { url, method } = request;
    const { statusCode } = response;

    const preControllerInstance = Date.now();

    this.logger.log(`${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Route accessed for user ${request.user.sub}`);
        }

        const executionTimeOfRoute = Date.now() - preControllerInstance;
        this.logger.log(
          `Response: status ${statusCode} - ${executionTimeOfRoute}ms`,
        );
      }),
    );
  }
}
