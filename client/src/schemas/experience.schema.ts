import { z } from "zod";

export const createExperienceValidationSchema = z.object({
  company_name: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  title: z.string(),
  isWorking: z.boolean(),
  location: z.string().optional(),
});

export type TExperienceFormValues = z.infer<
  typeof createExperienceValidationSchema
>;
