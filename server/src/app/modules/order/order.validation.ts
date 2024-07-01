import { z } from 'zod';

const orderedProduct = z.object({
  product: z.string(),
  quantity: z.number().gt(0),
});
export const createOrderValidationSchema = z.object({
  body: z.object({
    buyer_name: z.string(),
    buyer_contact: z.string(),
    soldAt: z.string(),
    products: z.array(orderedProduct),
    totalCost: z.number(),
  }),
});
