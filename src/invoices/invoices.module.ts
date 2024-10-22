import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // Add PrismaModule to imports
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
