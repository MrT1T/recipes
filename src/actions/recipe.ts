'use server';

import prisma from '@/utils/prisma';

export const getRecipes = async () => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });
    return { success: true, recipes };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { success: false, error: 'Failed to fetch recipes' };
  }
};

export const createRecipe = async (formData: FormData) => {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient_'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(formData.get(`quantity_${key.split('_')[1]}`) as string),
      }));

    if (!name || ingredients.length === 0) {
      return { success: false, error: 'Recipe name and at least one ingredient are required.' };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });
    return { success: true, recipe };
  } catch (error) {
    console.error('Error creating recipe:', error);
    return { success: false, error: 'Failed to create recipe' };
  }
};

export const updateRecipe = async (id: string, formData: FormData) => {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient_'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(formData.get(`quantity_${key.split('_')[1]}`) as string),
      }));

    if (!name || ingredients.length === 0) {
      return { success: false, error: 'Recipe name and at least one ingredient are required.' };
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });
    return { success: true, recipe };
  } catch (error) {
    console.error('Error updating recipe:', error);
    return { success: false, error: 'Failed to update recipe' };
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });
    await prisma.recipe.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { success: false, error: 'Failed to delete recipe' };
  }
};
