import { z } from 'zod';

export const updateOrderAfterPurchaseIntentReqParams = z.object({
  customerId: z.string(),
});

export const updateOrderAfterPurchaseIntentReqBody = z.object({
  seller_id: z.string(),
  order_id: z.string(),
});
