
import {
    ICloudinary,
    IConfig,
    ISlack,
  } from '@/typings/config';
import { Config } from 'apollo-server-express';

import nconf from 'nconf';

export const LOG_DIR = '../logs';
const env = process.env.NODE_ENV || 'development';
const filePath = env === 'development' ? `src/config/config.${env}.json` : `dist/config/config.${env}.json`;

nconf.argv().env().file({ file: 'src/config/dev_template.json' });
export const service_name = nconf.get('service_name');
export const prashth = nconf.get('service').prashth;
export const port = nconf.get('server').port;
nconf.argv().env().file({ file: 'src/config/rendering_data.json' });
export const jsonData = nconf.get('data');
nconf.argv().env().file({ file: 'src/config/rendering_data_ui_body.json' });
export const jsonDataUI = nconf.get('body');
nconf.argv().env().file({ file: 'src/config/carousel.json' });
export const carousel = nconf.get('data');
nconf.argv().env().file({ file: 'src/config/grid.json' });
export const grid = nconf.get('data');
nconf.argv().env().file({ file: 'src/config/testimonial_carousel.json' });
export const testimonialCarousel = nconf.get('data');
nconf.argv().env().file({ file: 'src/config/banner_cross_link.json' });
export const banner = nconf.get('data');


let config = {} as IConfig;

config.NODE_ENV = env;
config.LOG_FORMAT = 'combined';
config.LOG_DIR = '../logs';
config.airflow = nconf.get('airflow') as string;
config.restartAlertName = nconf.get('restart_alert_name') as string;
config.service_platform = nconf.get('service_platform') as string;
config.service_name = nconf.get('service_name') as string;
config.services = (() => {
  return nconf.get('services') as Record<string, string>;
})();
config.sentry = (nconf.get('sentry') || {}) as { dsn: string };
config.service_name = nconf.get('service_name') as string;
config.page = (nconf.get('page') || {}) as unknown;
config.customerProduct = (nconf.get('customer_product') || {}) as unknown;
config.androidContent = (nconf.get('android') || {}) as unknown;
config.webBaseUrl = (nconf.get('website_base_url') || 'https://www.wmall.co.in/') as string;
config.chatBaseUrl = (nconf.get('chat_base_url') || 'https://chat.kaip.in/') as string;
config.deferredDeepLink = nconf.get('deferred_deeplink') as string;
config.resellerAppUrl = (nconf.get('reseller_app_store_url') || 'https://play.google.com/store/search?q=saheli%20wmall') as string;
config.topSellingProducts = (nconf.get('top_selling_products') || {}) as unknown;
config.slack = (nconf.get('slack') || {}) as ISlack;
config.useNewSellerSkuSelectionMethod = nconf.get('use_new_seller_sku_selection_method');
config.whatsAppBusinessNumber = (nconf.get('whatsapp_business_number') || '9353900539') as string;
config.nushopHostSuffix = nconf.get('nushop_host_suffix') as string;
config.isProduction = env === 'production';
config.pm2ProcessName = nconf.get('pm2_process_name') as string;
config.shopdeckHostSuffix = nconf.get('shopdeck_host_suffix') as string;
config.gcpRoute = nconf.get('gcp_route') as string;
config.cloudinary = nconf.get('cloudinary') as ICloudinary;
config.redis_prefix_service_name = nconf.get('redis_prefix_service_name') as string;

export default config;

