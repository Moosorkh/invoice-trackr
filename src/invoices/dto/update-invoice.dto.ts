export class UpdateInvoiceDto {
  vendor_name?: string;
  amount?: number;
  due_date?: Date;
  description?: string;
  paid?: boolean;
}
