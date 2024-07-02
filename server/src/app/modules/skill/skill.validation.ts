import { Types } from 'mongoose';
import { z } from 'zod';

const skillValidationSchema = z.object({
  label: z.string(),
  image: z
    .string()
    .refine((id) => Types.ObjectId.isValid(id), {
      message: 'Must be a valid ObjectId',
    })
    .optional(),
});

export const createBulkSkillsValidationSchema = z.object({
  body: z.object({
    skills: z.array(skillValidationSchema),
    image: z
      .string()
      .refine((id) => Types.ObjectId.isValid(id), {
        message: 'Must be a valid ObjectId',
      })
      .optional(),
  }),
});

export const createSingleSkillValidationSchema = z.object({
  body: skillValidationSchema,
});
