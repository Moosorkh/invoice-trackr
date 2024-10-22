import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as necessary
import { InvoicesService } from './invoices.service';
import { CreateInvoiceSchema, CreateInvoiceDto } from './dto/create-invoice.dto';
import { z } from 'zod';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  getAllInvoices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.invoicesService.getAllInvoices(pageNumber, limitNumber);
  }

  @Post()
  createInvoice(@Body() invoiceData: CreateInvoiceDto) {
    const parseResult = CreateInvoiceSchema.safeParse(invoiceData);
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }
    return this.invoicesService.createInvoice(invoiceData);
  }

  @Get('total')
  async getTotalInvoices() {
    return this.invoicesService.getTotalByDueDate();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    try {
      const invoiceId = parseInt(id, 10);
      return await this.invoicesService.getInvoiceById(invoiceId);
    } catch (error) {
      throw new BadRequestException('Invalid invoice ID or invoice not found');
    }
  }
}
