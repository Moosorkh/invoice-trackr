import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  getAllInvoices() {
    return this.invoicesService.getAllInvoices();
  }

  @Post()
  createInvoice(@Body() invoiceData) {
    return this.invoicesService.createInvoice(invoiceData);
  }

  @Put(':id')
  async updateInvoice(
    @Param('id') id: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10); // Convert the string 'id' to a number
    return this.invoicesService.getInvoiceById(invoiceId);
  }
}
