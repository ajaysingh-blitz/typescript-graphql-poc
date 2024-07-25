const isProduction = process.env.NODE_ENV === 'production';
// const Sentry = require('@sentry/node');
import Sentry from '@sentry/node';
// const config = require('../config');
import config from '@/config';

if (isProduction && config.sentry.dsn) {
  Sentry.init({ dsn: config.sentry.dsn });
}

export const captureException = error => {
  if (isProduction && config.sentry.dsn) {
    Sentry.captureException(error);
  } else {
    console.error(error);
  }
};
