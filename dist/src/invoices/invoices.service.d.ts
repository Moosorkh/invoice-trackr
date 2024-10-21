import { PrismaService } from '../../prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllInvoices(page: number, limit: number): import(".prisma/client").Prisma.PrismaPromise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }[]>;
    getTotalInvoicesCount(): Promise<number>;
    getTotalByDueDate(): Promise<import(".prisma/client").Prisma.GetInvoiceAggregateType<{
        _sum: {
            amount: true;
        };
    }>>;
    getInvoiceById(id: number): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    createInvoice(invoiceData: CreateInvoiceDto): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
    delete(id: number): Promise<{
        description: string;
        id: number;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
}
