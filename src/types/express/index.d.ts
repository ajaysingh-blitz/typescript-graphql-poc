// src/types/express/index.d.ts

import { IBulkCsvData } from '@/typings/catalogue';
import { IReqUser } from '@/typings/common';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request<P = {}> {
      user?: IReqUser;
      admin?: IReqUser;
      actor?: IReqUser;
      session?: {
        auth: string;
      } | null;
      __csvData: IBulkCsvData[];
      body?: P;
    }

    export interface Response {
      sendformat: <Data>(data: Data, code?: number) => Response;
    }
  }
}
