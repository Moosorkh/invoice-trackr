import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllInvoices(page: number, limit: number, paid?: boolean, search?: string): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }[]>;
    getTotalByDueDate(): Promise<import(".prisma/client").Prisma.GetInvoiceAggregateType<{
        _sum: {
            amount: true;
        };
    }>>;
    getInvoiceById(id: number): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    updateInvoice(id: number, invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    deleteInvoice(id: number): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
    togglePaidStatus(id: number): Promise<{
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        description: string;
        paid: boolean;
        user_id: number | null;
    }>;
}
