import { z } from "zod";

export const createProjectValidationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .optional(),
  liveLink: z.string().url("Must be a valid URL"),
  clientGitHub: z.string().url("Must be a valid URL").optional(),
  backendGitHub: z.string().url("Must be a valid URL").optional(),
  startDate: z.date(),
  endDate: z.date(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
});

export type TProjectFormValues = z.infer<typeof createProjectValidationSchema>;
