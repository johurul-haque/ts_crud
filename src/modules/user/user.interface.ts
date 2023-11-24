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

export const updateUserPayload = userSchema
  .partial()
  .omit({ password: true, userId: true, username: true });

export const ordersPayload = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type UserPayload = z.infer<typeof updateUserPayload>;
export type OrdersPayload = z.infer<typeof ordersPayload>; 
