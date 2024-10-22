import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllInvoices(page: number, limit: number): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
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
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
}
