"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email must be a valid email address.'),
    password: zod_1.z.string().min(1, 'Password is required.'),
});
//# sourceMappingURL=login.dto.js.map