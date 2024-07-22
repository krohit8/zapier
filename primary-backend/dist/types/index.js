"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapCreateSchema = exports.signInSchema = exports.singUpSchema = void 0;
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
exports.zapCreateSchema = zod_1.z.object({
    availableTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
