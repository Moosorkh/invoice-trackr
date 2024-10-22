import { z } from 'zod';
export declare const CreateInvoiceSchema: z.ZodObject<{
    vendor_name: z.ZodString;
    amount: z.ZodNumber;
    due_date: z.ZodEffects<z.ZodString, string, string>;
    description: z.ZodOptional<z.ZodString>;
    paid: z.ZodOptional<z.ZodBoolean>;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    description?: string;
    vendor_name?: string;
    amount?: number;
    due_date?: string;
    paid?: boolean;
    userId?: number;
}, {
    description?: string;
    vendor_name?: string;
    amount?: number;
    due_date?: string;
    paid?: boolean;
    userId?: number;
}>;
export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
