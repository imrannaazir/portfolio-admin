import { Role } from "@/constant/constant";
import { z } from "zod";
const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});
export const loginFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at lest 4 character.",
  }),
  role: z.enum(Role).optional(),
  name: userNameValidationSchema.optional(),
});

export const registrationValidationSchema = z.object({
  email: z.string().email(),
  role: z.enum(Role).optional(),
  name: userNameValidationSchema,
  password: z.string().min(4).max(30),
});
