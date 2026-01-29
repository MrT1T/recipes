'use client';

import Link from 'next/link';

import { Button } from '@heroui/react';

import { RecipeCard } from '@/components/common';

import { useRecipeStore } from '@/store/recipe.store';

import { ROUTES } from '@/constants/routes';

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();

  return (
    <>
      <div className="flex w-full justify-center items-center mb-4">
        <Link href={ROUTES.RECIPES_NEW}>
          <Button color="primary">Add New Recipe</Button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {isLoading && <p className="text-center">Loading recipes...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
