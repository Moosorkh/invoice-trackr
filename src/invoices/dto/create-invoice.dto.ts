import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  vendor_name: z.string().min(1, 'Vendor name is required.'),
  amount: z.number().min(0, 'Amount must be a positive number.'),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Due date must be a valid date string',
  }),
  description: z.string().optional(),
  paid: z.boolean().optional(),
  userId: z.number().min(1, 'User ID must be a valid number.'),
});

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
