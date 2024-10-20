"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllInvoices() {
        return this.prisma.invoice.findMany();
    }
    async getTotalByDueDate() {
        try {
            return this.prisma.invoice.aggregate({
                _sum: { amount: true },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error retrieving totals by due date');
        }
    }
    async getInvoiceById(id) {
        return this.prisma.invoice.findUnique({
            where: { id: Number(id) },
        });
    }
    async createInvoice(invoiceData) {
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
    async update(id, updateInvoiceDto) {
        return this.prisma.invoice.update({
            where: { id: Number(id) },
            data: updateInvoiceDto,
        });
    }
    async delete(id) {
        return this.prisma.invoice.delete({
            where: { id: Number(id) },
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map