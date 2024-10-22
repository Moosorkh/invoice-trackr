import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Email must be a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type LoginDto = z.infer<typeof LoginSchema>;