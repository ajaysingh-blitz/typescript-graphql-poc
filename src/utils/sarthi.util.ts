import { requestMethodEnum } from '@/constants/enums';
import { IPublishersConfig, QueueConfigOptions } from '@/typings/config';
import mongoose from 'mongoose';
import http from 'http';

interface DashboardTabsMap {
  database_key: string;
  old_dashboard_tab_key: string;
  new_dashboard_tab_key: string;
  old_dashboard_tab_url: string;
  new_dashboard_tab_url: string;
  default_enabled: boolean;
  label: string;
  is_active: boolean;
}

interface SarthiCommonConstants {
  DASHBOARD_TABS_MAP: DashboardTabsMap[];
  CUSTOMER_CANCELLATION_REASONS: string[];
  ACCOUNT_STATUS: Record<string, string>;
  CUSTOMER_CANCELLATION_REASONS_LABEL_MAP: Record<string, string>;
  SEARCH_FILTER_FOR_SHIPPING_PARTNERS: Record<string, string>;
}

type SarthiFetch = <Response>(
  url: string,
  init?: {
    method: requestMethodEnum;
    headers?: Record<string, string | object | undefined>;
    body?: string;
    agent?: http.Agent;
  },
) => Promise<Response>;

type SarthiEnhancedFetch = ({
  noOfAllowedRetries,
  retryStaggerDuration,
  retryOnlyGETReqs,
  customFetch,
}: {
  noOfAllowedRetries?: number;
  retryStaggerDuration?: number;
  retryOnlyGETReqs?: boolean;
  customFetch?: SarthiFetch;
}) => SarthiFetch;

interface SarthiCommonUtils<T> {
  fetch: SarthiFetch;
  getEnhancedFetch: SarthiEnhancedFetch;
  replaceAll: (sourceString: string, replaceTo: string, replaceWith: string) => string;
  toTitleCase: (string: string) => string;
  assertNonEmpty: AssertNonEmpty<T>;
  audit: (schema: mongoose.Schema, fieldsToBeAudited: string[]) => void;
  processInBatches: (entities: unknown, batchProcessor: BatchProcessor, batchSize: number, batchFetchInfo: BatchFetchInfo) => unknown;
  toFloat: (num: string) => number;
  toInt: (number: string, radix?: number) => number;
  sanitizeAndGetRegex: (str: string, flags?: string) => RegExp;
  generateAndUploadExcelFileToS3: ({
    data,
    fileName,
    uploadFileToS3ByBuffer,
  }: {
    data: { sheetName: string; sheetData: Record<string, string>; styles: Record<string, unknown> };
    fileName: string;
    uploadFileToS3ByBuffer: ({ buffer, fileName, bucket }: { buffer: Buffer; fileName: string; bucket: string }) => Promise<string>;
  }) => Promise<string>;
}

interface SarthiCommonImages {
  getCloudFrontUrlFromS3Url: (url: string, width?: string) => string;
  getImageVariants: (url: string, object?: Object) => { baseURL: string; previewURL: string; thumbnailURL: string };
}

interface SarthiCommonKinesis {
  raiseKinesisEvent: (eventData: object, dataType: string) => void;
  generatePartitionKey: () => string;
}

interface SarthiCommonQueue {
  publishMessage: (payload: object, delay?: number) => unknown;
}

interface SarthiCommonQueueService {
  QueueService: new (queueServiceConfig: QueueConfigOptions & IPublishersConfig) => SarthiCommonQueue;
}

interface SarthiCommonKinesisEvents {
  KINESIS_DATA_TYPES: Record<string, string>;
  Kinesis: new (
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
    checklistStreamName: string,
    service_name: string,
  ) => SarthiCommonKinesis;
}

type BatchProcessor = (entities: unknown[]) => Promise<unknown[]>;

interface BatchFetchInfo {
  staggerBy?: number;
  batchFetcher?: null;
  errorClass?: Error;
  errorHandler?: (error: any, batch: any) => unknown;
  throwError?: boolean;
  debugMode?: boolean;
  collectResults?: boolean;
}

type AssertNonEmpty<T> = (
  obj: T,
  option?: { allowOnly?: string[]; checkOnly?: string[]; errClass?: Error; getErrMsg?: (key: string) => string },
) => true;

export interface ISlackMsgFormatterParams {
  messageType?: string;
  pretext?: string;
  data?: Record<string, string | object>;
}

interface SarthiSlackUtils {
  sendServiceRestartAlert: (projectPath: string, restartAlertName: string, pm2ProcessName?: string) => void;
  slackMsgFormatter: ({ messageType, pretext, data }: ISlackMsgFormatterParams) =>
    | {
        blocks: (
          | {
              type: string;
              fields: never[];
            }
          | {
              type: string;
              text: {
                type: string;
                text: string;
              };
            }
        )[];
        color?: string | undefined;
      }[]
    | undefined;
}

interface ISarthiCommonHelper<T> {
  constants: SarthiCommonConstants;
  utils: SarthiCommonUtils<T>;
  slack: SarthiSlackUtils;
}

interface ISarthiCommonServices {
  images: SarthiCommonImages;
  kinesisEvents: SarthiCommonKinesisEvents;
  queue: SarthiCommonQueueService;
}

interface ISarthiCommon<T> {
  helpers: ISarthiCommonHelper<T>;
  services: ISarthiCommonServices;
}

export interface ISarthi<T = Record<string, string | string[] | number | boolean>> {
  common: ISarthiCommon<T>;
}

const sarthi = require('sarthi') as ISarthi;

export const forceFetch = sarthi.common.helpers.utils.getEnhancedFetch({ retryOnlyGETReqs: false });
export const fetch = sarthi.common.helpers.utils.fetch;

export default sarthi;
