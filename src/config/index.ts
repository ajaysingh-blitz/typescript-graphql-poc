import nconf from 'nconf';

export const LOG_DIR = '../logs';
const env = process.env.NODE_ENV || 'development';
const filePath = env === 'development' ? `src/config/config.${env}.json` : `dist/config/config.${env}.json`;

nconf.argv().env().file({ file: 'src/config/dev_template.json' });
export const service_name = nconf.get('service_name');
export const port = nconf.get('server').port;

