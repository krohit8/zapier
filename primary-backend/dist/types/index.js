"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.singUpSchema = void 0;
const zod_1 = require("zod");
exports.singUpSchema = zod_1.z.object({
    password: zod_1.z.string().min(6),
    username: zod_1.z.string().min(6),
    name: zod_1.z.string()
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
