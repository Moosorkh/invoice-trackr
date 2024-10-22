import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(page?: string, limit?: string): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }[]>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    getTotalInvoices(): Promise<import(".prisma/client").Prisma.GetInvoiceAggregateType<{
        _sum: {
            amount: true;
        };
    }>>;
    getInvoiceById(id: string): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
}
