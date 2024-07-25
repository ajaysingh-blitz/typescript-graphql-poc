import { z } from 'zod';
export const toggleCollectionVisibleRequestUser = z
  .object({
    _id: z.string({
      required_error: 'Seller Id is Required',
      invalid_type_error: 'Invalid Seller Id',
    }),
  })
  .partial();

export const toggleCollectionVisibleRequestBody = z
  .object({
    newStatus: z.boolean({
      required_error: 'Status is Required',
      invalid_type_error: 'Invalid Status',
    }),
  })
  .partial();

export const toggleCollectionVisibleRequestParams = z
  .object({
    short_id: z.string({
      required_error: 'Collection Id is Required',
      invalid_type_error: 'Invalid Collection Id',
    }),
  })
  .partial();

export const deActivateCollectionRequestUser = z
  .object({
    _id: z.string({
      required_error: 'Seller Id is Required',
      invalid_type_error: 'Invalid Seller Id',
    }),
  })
  .partial();

export const deActivateCollectionRequestParams = z
  .object({
    short_id: z.string({
      required_error: 'Collection Id is Required',
      invalid_type_error: 'Invalid Collection Id',
    }),
  })
  .partial();
