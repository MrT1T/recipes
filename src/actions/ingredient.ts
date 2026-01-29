'use server';

import { ingredientSchema } from '@/schemas/zod';
import prisma from '@/utils/prisma';
import { ZodError } from 'zod';

export const createIngredient = async (data: FormData) => {
  try {
    const validatedData = ingredientSchema.parse({
      name: data.get('name'),
      category: data.get('category'),
      unit: data.get('unit'),
      pricePerUnit: data.get('pricePerUnit') ? Number(data.get('pricePerUnit')) : null,
      description: data.get('description'),
    });

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unit: validatedData.unit,
        pricePerUnit: validatedData.pricePerUnit,
        description: validatedData.description || undefined,
      },
    });
    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((e) => e.message).join(', ');
      console.log('Validation errors:', validationErrors);

      return { error: validationErrors };
    }

    console.error('Error creating ingredient:', error);
    return { error: 'Failed to create ingredient' };
  }
};

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return { success: true, ingredients };
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return { error: 'Failed to fetch ingredients' };
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const ingredient = await prisma.ingredient.delete({ where: { id } });
    return { success: true, ingredient };
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    return { error: 'Failed to delete ingredient' };
  }
};
