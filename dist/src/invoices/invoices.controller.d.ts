import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }[]>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        description: string;
        id: number;
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
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    deleteInvoice(id: string): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
}
