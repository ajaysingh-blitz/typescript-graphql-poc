import { NextFunction, Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { ZodError } from 'zod';
import { NotFoundError } from './notFoundError.middleware';
import { IExtendedError } from '@/typings/common';

const errorMiddleware = (error: IExtendedError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    if (error instanceof NotFoundError) {
      !res.headersSent &&
        res.status(status).send({
          errors: [
            {
              error_code: status,
              title: message,
            },
          ],
        });
      throw error;
    } else if (error instanceof ZodError) {
      !res.headersSent &&
        res.status(501).send({
          code: 501,
          errors: error.issues,
        });
      throw error;
    } else {
      !res.headersSent &&
        res.status(500).send({
          code: 500,
          errors: [
            {
              error_code: status,
              title: message || 'OOPs! Something went wrong.',
            },
          ],
        });
      throw error;
    }
  } catch (err) {
    Sentry.captureException(err);
    next(err);
  }
};

export default errorMiddleware;
