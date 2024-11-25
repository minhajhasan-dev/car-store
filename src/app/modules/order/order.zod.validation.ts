import mongoose from 'mongoose';
import { z } from 'zod';

export const OrderSchema = z.object({
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),

  car: z
    .string({ message: 'Car ID is required.' })
    .refine((value) => mongoose.isValidObjectId(value), {
      message: 'Car ID must be a valid ObjectId.',
    }),

  quantity: z
    .number({ message: 'Quantity is required.' })
    .int({ message: 'Quantity must be an integer.' })
    .positive({ message: 'Quantity must be greater than zero.' }),

  totalPrice: z
    .number({ message: 'Total Price is required.' })
    .positive({ message: 'Total price must be greater than zero.' }),
});

export default OrderSchema;
