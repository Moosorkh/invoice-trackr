import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // Example of getting all invoices with pagination
  async getAllInvoices(
    page: number,
    limit: number,
    paid?: boolean,
    search?: string,
  ) {
    const offset = (page - 1) * limit;
    const where: any = {};

    if (paid !== undefined) {
      where.paid = paid;
    }

    if (search) {
      where.vendor_name = {
        contains: search,
      };
    }

    return this.prisma.invoice.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { due_date: 'asc' },
    });
  }

  async getTotalByDueDate() {
    try {
      return this.prisma.invoice.aggregate({
        _sum: { amount: true },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving totals by due date');
    }
  }

  async getInvoiceById(id: number) {
    return this.prisma.invoice.findUnique({
      where: { id: Number(id) },
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
        user_id: null,
      },
    });
  }

  async updateInvoice(id: number, invoiceData: CreateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        vendor_name: invoiceData.vendor_name,
        amount: invoiceData.amount,
        due_date: invoiceData.due_date,
        description: invoiceData.description,
        paid: invoiceData.paid,
      },
    });
  }

  async deleteInvoice(id: number) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }

  async togglePaidStatus(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    return this.prisma.invoice.update({
      where: { id },
      data: { paid: !invoice.paid },
    });
  }
}
