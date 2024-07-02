import { z } from "zod";

export const createBlogValidationSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  image: z.string().optional(),
  description: z.string({ required_error: "Title is required." }).optional(),
});

export type TBlogFormValues = z.infer<typeof createBlogValidationSchema>;
