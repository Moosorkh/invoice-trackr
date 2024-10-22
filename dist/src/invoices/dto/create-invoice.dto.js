"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceSchema = void 0;
const zod_1 = require("zod");
exports.CreateInvoiceSchema = zod_1.z.object({
    vendor_name: zod_1.z.string().min(1, 'Vendor name is required.'),
    amount: zod_1.z.number().min(0, 'Amount must be a positive number.'),
    due_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Due date must be a valid date string',
    }),
    description: zod_1.z.string().optional(),
    paid: zod_1.z.boolean().optional(),
    userId: zod_1.z.number().min(1, 'User ID must be a valid number.'),
});
//# sourceMappingURL=create-invoice.dto.js.map