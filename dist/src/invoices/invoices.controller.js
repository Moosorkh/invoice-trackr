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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    getAllInvoices(page = '1', limit = '10', paid, search) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const paidFilter = paid === 'true' ? true : paid === 'false' ? false : undefined;
        return this.invoicesService.getAllInvoices(pageNumber, limitNumber, paidFilter, search);
    }
    createInvoice(invoiceData) {
        const parseResult = create_invoice_dto_1.CreateInvoiceSchema.safeParse(invoiceData);
        if (!parseResult.success) {
            throw new common_1.BadRequestException(parseResult.error.errors);
        }
        return this.invoicesService.createInvoice(invoiceData);
    }
    async getTotalInvoices() {
        return this.invoicesService.getTotalByDueDate();
    }
    async getInvoiceById(id) {
        try {
            const invoiceId = parseInt(id, 10);
            return await this.invoicesService.getInvoiceById(invoiceId);
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid invoice ID or invoice not found');
        }
    }
    async updateInvoice(id, invoiceData) {
        const parseResult = create_invoice_dto_1.CreateInvoiceSchema.safeParse(invoiceData);
        if (!parseResult.success) {
            throw new common_1.BadRequestException(parseResult.error.errors);
        }
        const invoiceId = parseInt(id, 10);
        return this.invoicesService.updateInvoice(invoiceId, invoiceData);
    }
    async deleteInvoice(id) {
        const invoiceId = parseInt(id, 10);
        return this.invoicesService.deleteInvoice(invoiceId);
    }
    async togglePaidStatus(id) {
        const invoiceId = parseInt(id, 10);
        return this.invoicesService.togglePaidStatus(invoiceId);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('paid')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "getAllInvoices", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('total'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getTotalInvoices", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getInvoiceById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "deleteInvoice", null);
__decorate([
    (0, common_1.Put)(':id/toggle-paid'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "togglePaidStatus", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map