import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }[]>;
    createInvoice(invoiceData: any): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    updateInvoice(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
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
