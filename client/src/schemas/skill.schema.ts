import { z } from "zod";

export const createSkillValidationSchema = z.object({
  label: z.string({ required_error: "Label is required." }),
  image: z.string().optional(),
});

export type TSkillFormValues = z.infer<typeof createSkillValidationSchema>;
