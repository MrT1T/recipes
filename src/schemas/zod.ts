import { object, string, number } from 'zod';

export const signInSchema = object({
  email: string('Email is required').min(4, 'Email is required').email('Invalid email'),
  password: string('Password is required')
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const ingredientSchema = object({
  name: string('Name is required').min(1, 'Name is required'),
  category: string('Category is required').min(1, 'Category is required'),
  unit: string('Unit is required').min(1, 'Unit is required'),
  pricePerUnit: number('Price per unit must be a number')
    .min(0, 'Price per unit must be minimum 0')
    .nullable()
    .optional(),
  description: string().optional(),
});
