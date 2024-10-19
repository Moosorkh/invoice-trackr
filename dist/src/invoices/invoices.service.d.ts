import { PrismaService } from '../../prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    private invoices;
    getAllInvoices(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }[]>;
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
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        id: number;
        description: string;
        vendor_name: string;
        amount: number;
        due_date: Date;
        paid: boolean;
        user_id: number | null;
    }>;
}
