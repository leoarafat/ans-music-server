"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email  is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string({}).optional(),
            lastName: zod_1.z.string({}).optional(),
        })
            .optional(),
        phoneNumber: zod_1.z.string({}).optional(),
        email: zod_1.z.string({}).optional(),
        password: zod_1.z.string({}).optional(),
        address: zod_1.z.string({}).optional(),
        role: zod_1.z.string({}).optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.UserValidation = {
    create,
    updateUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
