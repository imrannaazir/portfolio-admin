import { Types } from 'mongoose';
import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string().optional(),
    technologies: z
      .array(z.string())
      .min(1, 'At least one technology is required')
      .optional(),
    liveLink: z.string().url('Must be a valid URL'),
    clientGitHub: z.string().url('Must be a valid URL').optional(),
    backendGitHub: z.string().url('Must be a valid URL').optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Must be a valid date',
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Must be a valid date',
    }),
    tags: z
      .array(
        z.string().refine((id) => Types.ObjectId.isValid(id), {
          message: 'Must be a valid ObjectId',
        }),
      )
      .optional(),
    image: z
      .string()
      .refine((id) => Types.ObjectId.isValid(id), {
        message: 'Must be a valid ObjectId',
      })
      .optional(),
  }),
});
