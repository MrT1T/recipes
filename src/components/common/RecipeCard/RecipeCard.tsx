'use client';

import { FC, useTransition } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRecipeStore } from '@/store/recipe.store';

import { UNIT_OPTIONS } from '@/constants/unit';
import type { IRecipe } from '@/types/recipe';

interface IRecipeCardProps {
  recipe: IRecipe;
}

export const RecipeCard: FC<IRecipeCardProps> = ({ recipe }) => {
  const { removeRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();
  console.log('recipe', recipe);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.error('Failed to remove recipe:', error);
      }
    });
  };

  const getUnitAbbreviation = (unitValue: string) => {
    const unit = UNIT_OPTIONS.find((u) => u.value === unitValue);
    return unit ? unit.abbreviation : unitValue;
  };

  return (
    <Card className="w-full max-w-md h-[560px] flex flex-col">
      <div className="h-full flex flex-col">
        {recipe.imageUrl ? (
          <div className="relative h-48 group overflow-hidden rounded-large border">
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-default-200 flex items-center justify-center rounded-large border">
            <span className="text-default-500">No Image</span>
          </div>
        )}

        <CardHeader className="flex justify-between items-center text-black">
          <h2 className="text-lg font-bold">{recipe.name}</h2>
        </CardHeader>

        <CardBody className="flex-1 text-black">
          <p className="text-gray-600 line-clamp-6 max-h-[200px] overflow-y-auto">
            {recipe.description || 'No description available'}
          </p>
          <h3 className="mt-4 font-semibold">Ingredients:</h3>
          <ul className="list-disc pl-5 overflow-y-auto max-h-24">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.ingredient.name}: {ing.quantity} {getUnitAbbreviation(ing.ingredient.unit)}
              </li>
            ))}
          </ul>
        </CardBody>

        <div className="flex justify-end gap-2 p-4">
          <Link href={`/recipes/${recipe.id}`}>
            <Button color="primary" variant="light">
              Edit
            </Button>
          </Link>
          <Button color="danger" variant="light" onPress={handleDelete} isLoading={isPending}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
