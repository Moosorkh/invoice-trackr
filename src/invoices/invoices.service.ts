import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';


@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}
  private invoices = [];

  getAllInvoices() {
    return this.prisma.invoice.findMany();
  }

  async getInvoiceById(id: number) {
    return this.prisma.invoice.findUnique({
      where: { id },
    });
  }

  async createInvoice(invoiceData: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        vendor_name: invoiceData.vendor_name,
        amount: invoiceData.amount,
        due_date: invoiceData.due_date,
        description: invoiceData.description,
        paid: invoiceData.paid,
        // 'user' can be added later when the relation is set
        user_id: null,
      },
    });
  }
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }
}
