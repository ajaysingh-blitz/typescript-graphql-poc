import { CreateOptionals } from './utils/createOptionals';

export interface ISlack {
  pickupsChannel: string;
  price_change: string;
  slackAccessToken: string;
  facebook_conversion_events: string;
  soochi_error: string;
  nushop_operations_alerts: string;
  nushop_operations_alerts_lite: string;
  nushop_cron_alerts: string;
  sentry_errors: string;
  kapturecrm_webhook: string;
  kapture_alerts: string;
  ecomm_oos_alerts: string;
  dukandar_consumer_alerts: string;
  price_update_alert: string;
}

export interface IServer {
  port: number;
}

export interface ICloudinary {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  folder_name: string;
  reseller_folder_name: string;
}


export interface IConfig {
  NODE_ENV: string;
  LOG_FORMAT: string;
  LOG_DIR: string;
  server: IServer;
  airflow: string;
  restartAlertName: string;
  service_platform: string;
  service_name: string;
  page: unknown;
  customerProduct: unknown;
  androidContent: unknown;
  topSellingProducts: unknown;
  useNewSellerSkuSelectionMethod: unknown;
  services: Record<string, string>;
  sentry: { dsn: string };
  apm_service: { name: string; url: string };
  webBaseUrl: string;
  chatBaseUrl: string;
  deferredDeepLink: string;
  resellerAppUrl: string;
  slack: ISlack;
  whatsAppBusinessNumber: string;
  nushopHostSuffix: string;
  isProduction: boolean;
  pm2ProcessName: string;
  shopdeckHostSuffix: string;
  gcpRoute: string;
  cloudinary: ICloudinary;
  redis_prefix_service_name: string;
}

export interface IPublishersConfig {
  projectId: string;
  accessKeyId: string;
  secretAccessKey: string;
  client_email: string;
  private_key: string;
}

interface IQueueConfig {
  serviceType: string;
  queueUrl: string;
  topicName: string;
}


export type QueueConfigOptions = CreateOptionals<IQueueConfig>;


export type ConfigOptional = CreateOptionals<IConfig>;
