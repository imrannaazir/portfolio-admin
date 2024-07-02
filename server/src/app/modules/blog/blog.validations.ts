import { Types } from 'mongoose';
import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    image: z
      .string()
      .refine((id) => Types.ObjectId.isValid(id), {
        message: 'Must be a valid ObjectId',
      })
      .optional(),
    content: z.string().nonempty('Content is required'),
  }),
});
