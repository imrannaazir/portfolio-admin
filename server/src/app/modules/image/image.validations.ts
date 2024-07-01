import { z } from 'zod';

const imageValidationSchema = z.object({
  file_name: z.string(),
  size: z.number(),
  url: z.string(),
  format: z.string(),
});

export const createSingleImageValidationSchema = z.object({
  body: imageValidationSchema,
});

export const createManyImageValidationSchema = z.object({
  body: z.object({
    images: z.array(imageValidationSchema),
  }),
});

export const deleteManyValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
