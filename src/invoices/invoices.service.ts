import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  getAllInvoices(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return this.prisma.invoice.findMany({
      skip: offset,
      take: limit,
      orderBy: { due_date: 'asc' },
    });
  }

  async getTotalInvoicesCount() {
    return this.prisma.invoice.count();
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
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id: Number(id) },
      data: updateInvoiceDto,
    });
  }

  async delete(id: number) {
    return this.prisma.invoice.delete({
      where: { id: Number(id) },
    });
  }
}
