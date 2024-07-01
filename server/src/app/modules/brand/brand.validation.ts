import { z } from 'zod';

export const createBrandValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    slogan: z.string().optional(),
    logo: z.string().optional(),
    cover_photo: z.string().optional(),
  }),
});
