import { z } from 'zod';

// create validation schema
export const createVariantValidationSchema = z.object({
  body: z.object({
    variant_name: z.string(),
  }),
});

// create option validation schema
export const createOptionValidationSchema = z.object({
  body: z.object({
    option_name: z.string(),
    variantId: z.string(),
  }),
});
