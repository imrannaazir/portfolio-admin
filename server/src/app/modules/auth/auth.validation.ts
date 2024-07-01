import { z } from 'zod';
import { Role } from '../user/user.constant';

const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const registrationValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    user: z.enum(Role).optional(),
    password: z.string().min(4).max(30),
    name: userNameValidationSchema,
    profileImage: z.string().optional(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});
