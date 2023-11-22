import { z } from 'zod';

export const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z
    .object({
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
    .array()
    .optional(),
});

export type TUser = z.infer<typeof userSchema>;
