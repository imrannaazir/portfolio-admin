import { z } from 'zod';

export const addExperienceValidationSchema = z.object({
  body: z.object({
    company_name: z.string(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    title: z.string(),
    isWorking: z.boolean(),
    location: z.string().optional(),
  }),
});
export const updateExperienceValidationSchema = z.object({
  body: z.object({
    company_name: z.string().optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional().optional(),
    title: z.string().optional(),
    isWorking: z.boolean().optional(),
    location: z.string().optional(),
  }),
});
