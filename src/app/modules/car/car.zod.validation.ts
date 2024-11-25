import { z } from 'zod';

const carSchema = z.object({
  brand: z.string().trim().min(1, { message: 'Brand is required' }),
  model: z.string().trim().min(1, { message: 'Model is required' }),
  year: z
    .number()
    .int()
    .min(1886, { message: 'Year must be 1886 or later' })
    .max(new Date().getFullYear(), { message: 'Year cannot be in the future' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  isStock: z.boolean(),
  isDeleted: z.boolean().default(false),
});

export default carSchema;
