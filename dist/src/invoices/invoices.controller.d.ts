import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(page?: string, limit?: string, paid?: string, search?: string): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }[]>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
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
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    updateInvoice(id: string, invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    deleteInvoice(id: string): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    togglePaidStatus(id: string): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
}
