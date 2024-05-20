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
    data: z.object({
      phoneNumber: z.string({}).optional(),
      address: z.string({}).optional(),
      country: z.string({}).optional(),
      state: z.string({}).optional(),
      city: z.string({}).optional(),
      postCode: z.string({}).optional(),
      channelName: z.string({}).optional(),
      channelUrl: z.string({}).optional(),
      subscribeCount: z.number({}).int().optional(),
      videosCount: z.number({}).int().optional(),
    }),
  }),
  files: z.object({
    image: z.array(
      z.object({}).refine(() => true, {
        message: 'Image is required',
      }),
    ),
    nidFront: z.array(
      z.object({}).refine(() => true, {
        message: 'nidFront is required',
      }),
    ),
    nidBack: z.array(
      z.object({}).refine(() => true, {
        message: 'nidBack is required',
      }),
    ),
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
