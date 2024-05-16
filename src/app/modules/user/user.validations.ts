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
      phoneNumber: z.string({
        required_error: 'phoneNumber is required',
      }),
      address: z.string({
        required_error: 'address is required',
      }),
      country: z.string({
        required_error: 'country is required',
      }),
      state: z.string({
        required_error: 'state is required',
      }),
      city: z.string({
        required_error: 'city is required',
      }),
      postCode: z.string({
        required_error: 'postCode is required',
      }),
      channelName: z.string({
        required_error: 'channelName is required',
      }),
      channelUrl: z.string({
        required_error: 'channelUrl is required',
      }),
      subscribeCount: z
        .number({
          required_error: 'subscribeCount is required',
        })
        .int(),
      videosCount: z
        .number({
          required_error: 'videosCount is required',
        })
        .int(),
    }),
  }),
  files: z.object({
    image: z
      .array(
        z.object({}).refine(() => true, {
          message: 'Image is required',
        }),
      )
      .nonempty({ message: 'Profile Image array cannot be empty' }),
    nidFront: z
      .array(
        z.object({}).refine(() => true, {
          message: 'nidFront is required',
        }),
      )
      .nonempty({ message: 'nidFront array cannot be empty' }),
    nidBack: z
      .array(
        z.object({}).refine(() => true, {
          message: 'nidBack is required',
        }),
      )
      .nonempty({ message: 'nidBack array cannot be empty' }),
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
