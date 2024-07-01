import { z } from "zod";

export const sellProductValidationSchema = z.object({
  buyer_name: z.string().min(3),
  buyer_contact: z.string(),
  quantity: z.coerce.number().gt(0),
  soldAt: z.date(),
});
