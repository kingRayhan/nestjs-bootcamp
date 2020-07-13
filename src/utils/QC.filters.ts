import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QuickCrudException } from 'quick-crud/dist/utils/QuickCrudError';

@Catch(QuickCrudException)
export class HandleQuickCrudException implements ExceptionFilter {
  catch(exception: QuickCrudException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
