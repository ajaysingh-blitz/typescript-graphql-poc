import { z } from 'zod';

const ALLOWED_MIME_TYPES = z.enum(
  ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4', 'image/JPG', 'image/JPEG', 'image/PNG', 'video/MP4'],
  { required_error: 'Invalid Image/Video File.' },
);

const MEDIA_TYPE = z.enum(['', 'image', 'video']);

export const updateSellerCustomReturnOrExchangeCondition = z.object({
  return_reasons: z
    .object({
      label: z.string(),
      value: z.boolean(),
    })
    .array(),
  acceptance_criteria: z
    .object({
      label: z.string(),
      value: z.boolean(),
    })
    .array(),
});

export const updateSellerCustomReturnOrExchangeConditionReqQuery = z.object({
  key: z.string(),
});

export const createSellerCustomReturnOrExchangeConditionReqBody = z.object({
  condition_type: z.string(),
  condition_days: z.number().nullable(),
  label: z.string(),
});

export const createDefaultCustomReturnAndExchangeConditionsReqParams = z.object({
  sellerId: z.string(),
});

export const sellerImageUploadRequestBody = z.object({
  fileName: z.string(),
  contentType: ALLOWED_MIME_TYPES,
});

export const getSellerUploadedMediaRequestBody = z.object({
  page_no: z.string(),
  limit: z.string(),
  filters: z.object({
    name: z.string().optional(),
    date: z.string().optional(),
    media_type: MEDIA_TYPE.optional()
  }).optional()
});
