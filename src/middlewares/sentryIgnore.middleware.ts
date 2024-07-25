//Modules
import { NextFunction, Request, Response } from 'express';
//Exceptions
import { HandledError } from '@/exceptions/HandledError';
// Typings
import { IExtendedError } from '@/typings/common';

// Add all types of error you want sentry to ignore
const sentryIgnoreMiddleware = (error: IExtendedError, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  if (error instanceof HandledError) {
    return (
      !res.headersSent &&
      res.status(status).json({
        errors: [
          {
            error_code: status,
            title: message,
          },
        ],
      })
    );
  }

  next(error);
};

export default sentryIgnoreMiddleware;
