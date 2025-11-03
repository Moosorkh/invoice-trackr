import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as necessary
import { InvoicesService } from './invoices.service';
import {
  CreateInvoiceSchema,
  CreateInvoiceDto,
} from './dto/create-invoice.dto';
import { z } from 'zod';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  getAllInvoices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('paid') paid?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const paidFilter =
      paid === 'true' ? true : paid === 'false' ? false : undefined;
    return this.invoicesService.getAllInvoices(
      pageNumber,
      limitNumber,
      paidFilter,
      search,
    );
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

  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() invoiceData: CreateInvoiceDto,
  ) {
    const parseResult = CreateInvoiceSchema.safeParse(invoiceData);
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }
    const invoiceId = parseInt(id, 10);
    return this.invoicesService.updateInvoice(invoiceId, invoiceData);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10);
    return this.invoicesService.deleteInvoice(invoiceId);
  }

  @Put(':id/toggle-paid')
  async togglePaidStatus(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10);
    return this.invoicesService.togglePaidStatus(invoiceId);
  }
}
