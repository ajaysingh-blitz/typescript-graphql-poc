import { CreateOptionals } from './utils/createOptionals';

interface IQueueConfig {
  serviceType: string;
  queueUrl: string;
  topicName: string;
}

export interface IPublishersConfig {
  projectId: string;
  accessKeyId: string;
  secretAccessKey: string;
  client_email: string;
  private_key: string;
}

export type QueueConfigOptions = CreateOptionals<IQueueConfig>;

export interface IAwsType {
  accessKeyId: string;
  secretAccessKey: string;
  s3: {
    region: 'ap-south-1';
    accessKeyId: string;
    secretAccessKey: string;
    product_asset_bucket: string;
    catalogue_asset_bucket: string;
    reseller_content_bucket: string;
    static_saheli_groups_bucket: string;
    wmall_ops_asset_bucket: string;
    nushop_ops_assets: string;
    nushop_website_assets: string;
    seller_image_upload: string;
  };
  kinesis: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    checklistStreamName: string;
  };
  developerAccessRoleArn: string;
  emr: {
    secretKey: string;
  };
  nushop_catalogue_bulk_upload_queue_url: string;
  nushop_wmall_catalogue_sync_queue_url: string;
  nushop_video_upload_queue_url: string;
  elasticsearch_data_queue: string;
  nushop_catalogue_bulk_update_images_queue_url: string;
  fetch_external_reviews: string;
  nushop_review_bulk_upload_queue_url: string;
  external_catalogue_upload_queue_url: string;
  nushop_fb_conversion_queue_url: string;
  image_bg_removal_queue: string;
  nushop_best_seller_in_range_queue_url: string;
  bulk_operation: string;
  sts: {
    accessKeyId: string;
    secretAccessKey: string;
    federationUrl: string;
  };
}

export interface FirebaseType {
  dynamic_links: {
    subdomain: string;
    web_api_key: string;
    android_package_name: string;
    android_min_package_version_code: string;
  };
}

export interface DatabaseType {
  client: string;
  events: {
    client: string;
    connection: {
      host: string;
      port: string;
      user: string;
      password: string;
      name: string;
    };
  };
  'main-mongo': {
    client: string;
    connection: {
      host: string;
      port: string;
      user: string;
      password: string;
      name: string;
    };
    replicas: [
      {
        host: string;
        port: string;
        user: string;
        password: string;
        name: string;
      },
      {
        host: string;
        port: string;
        user: string;
        password: string;
        name: string;
      },
    ];
  };
}

export interface IProduct {
  selling_threshold: {
    low: number;
    medium: number;
    high: number;
    'very high': number;
  };
}

export interface IRedis {
  port: number;
  host: string;
  password: string;
}

export interface IEventQueue {
  redis: {
    port: number;
    host: string;
  };
}

export interface IQueue {
  update_template_visibilities: {
    name: string;
    prefix: string;
  };
  wa_retargeting: {
    name: string;
  };
}

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

export interface IWms {
  sellers: {
    '5ce905fb3cab6225153a3094': string;
  };
  warehouse: {
    xpressbees0002: {
      provider: string;
      warehouse_name: string;
      warehouse_id: string;
      base_url: string;
      token: string;
    };
    xpressbees0001: {
      provider: string;
      warehouse_name: string;
      warehouse_id: string;
      base_url: string;
      token: string;
    };
  };
}

export interface IRainforest {
  api_key: string;
  amazon_domain: string;
  base_url: string;
}

export interface IRazorpay {
  staging_key: string;
  production_key: string;
}

export interface IImageKit {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
}

export interface IKapture {
  base_url: string;
  create_user_auth_key: string;
  create_ticket_auth_key: string;
  update_ticket_auth_key: string;
  search_ticket_auth_key: string;
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

export interface IPublishers {
  tpl_warehouses: IQueueConfig;
  config: IPublishersConfig;
  bulk_remove_catalogue_fields: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  send_sms_queue: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  bulk_operation: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  fetch_external_reviews: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_review_bulk_upload_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  soochi_bulk_operations_queue: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_edit_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_upload_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  external_catalogue_upload_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_update_images_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_update_videos_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_delete_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  elasticsearch_data_queue: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_upload_v2_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
  nushop_catalogue_bulk_update_images_v2_queue_url: {
    serviceType: string;
    queueUrl: string;
    topicName: string;
  };
}

export interface IConfig {
  NODE_ENV: string;
  LOG_FORMAT: string;
  LOG_DIR: string;
  server: IServer;
  aws: IAwsType;
  airflow: string;
  firebase: FirebaseType;
  restartAlertName: string;
  service_platform: string;
  service_name: string;
  database: DatabaseType;
  PORT: number;
  port: number;
  page: unknown;
  customerProduct: unknown;
  androidContent: unknown;
  topSellingProducts: unknown;
  useNewSellerSkuSelectionMethod: unknown;
  services: Record<string, string>;
  sentry: { dsn: string };
  apm_service: { name: string; url: string };
  product: IProduct;
  webBaseUrl: string;
  chatBaseUrl: string;
  deferredDeepLink: string;
  redis: IRedis;
  event_queue: IEventQueue;
  queue: IQueue;
  resellerAppUrl: string;
  slack: ISlack;
  wms: IWms;
  whatsAppBusinessNumber: string;
  nushopHostSuffix: string;
  isProduction: boolean;
  rainforest: IRainforest;
  razorpay: IRazorpay;
  imagekit: IImageKit;
  pm2ProcessName: string;
  kapture: IKapture;
  shopdeckHostSuffix: string;
  publishers: IPublishers;
  gcpRoute: string;
  cloudinary: ICloudinary;
  redis_prefix_service_name: string;
}

export type ConfigOptional = CreateOptionals<IConfig>;
