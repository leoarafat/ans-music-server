import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    email: z.string({
      required_error: 'Email  is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string({}).optional(),
        lastName: z.string({}).optional(),
      })
      .optional(),
    phoneNumber: z.string({}).optional(),
    email: z.string({}).optional(),
    password: z.string({}).optional(),
    address: z.string({}).optional(),
    role: z.string({}).optional(),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
export const UserValidation = {
  create,
  updateUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
