import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Response } from 'express';

@Catch(Error.CastError)
export class HandleInvalidObjectId implements ExceptionFilter {
  catch(exception: Error.CastError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid objectId',
    });
  }
}
