import { z } from "zod";

const skillValidationSchema = z.object({
  label: z.string(),
});

export const createBulkSkillsValidationSchema = z.object({
  body: z.object({
    skills: z.array(skillValidationSchema),
  }),
});

export const createSingleSkillValidationSchema = z.object({
  body: skillValidationSchema,
});
