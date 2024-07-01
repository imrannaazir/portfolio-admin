import { z } from 'zod';

export const createCollectionValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
  }),
});
