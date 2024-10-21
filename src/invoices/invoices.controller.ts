import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as necessary
import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  getAllInvoices(
  @Query('page') page: string = '1', 
  @Query('limit') limit: string = '10') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.invoicesService.getAllInvoices(pageNumber, limitNumber);
  }

 
  @Get('total-count')
  async getTotalInvoicesCount() {
    return this.invoicesService.getTotalInvoicesCount();
  }

  
  @Post()
  createInvoice(@Body() invoiceData: CreateInvoiceDto) {
    return this.invoicesService.createInvoice(invoiceData);
  }

  
  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    const invoiceId = parseInt(id, 10);
    return this.invoicesService.update(invoiceId, updateInvoiceDto);
  }

  
  @Get('total')
  async getTotalInvoices() {
    return this.invoicesService.getTotalByDueDate();
  }

 
  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10);
    return this.invoicesService.getInvoiceById(invoiceId);
  }

  
  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10); // Convert the string 'id' to a number
    return this.invoicesService.delete(invoiceId);
  }
}
