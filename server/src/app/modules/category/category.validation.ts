import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    collection: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});
