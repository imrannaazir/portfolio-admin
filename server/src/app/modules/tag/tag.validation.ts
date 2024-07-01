import { z } from 'zod';

export const createTagValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
