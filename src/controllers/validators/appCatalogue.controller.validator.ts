import { z } from 'zod';

export const getPaginatedOOSProductBySellerReqQuery = z.object({
  preferred_oos_quantity: z.number().optional(),
  page_no: z.string(),
  page_size: z.string(),
});

export const createProductForAppRequest = z.object({
  createProductRequest: z.string(),
});

export const getAllProductsForSellerReqBody = z.object({
  page_no: z.string(),
  page_size: z.string(),
  product_name: z.string(),
  sort_by: z.string(),
  product_type: z.string().array(),
  live_status: z.string().array(),
  availability: z.string().array(),
  preferred_oos_quantity: z.number(),
});
