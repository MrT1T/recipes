'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { useRecipeStore } from '@/store/recipe.store';

import type { IRecipe } from '@/types/recipe';
import { RecipeForm } from '@/components/UI/forms/Recipe';

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  //   const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  //   useEffect(() => {
  //     if (!hasSearched && (recipes.length > 0 || error)) {
  //       const foundRecipe = recipes.find((r) => r.id === id) || null;
  //       setRecipe(foundRecipe);
  //       setHasSearched(true);
  //     }
  //   }, [recipes, id, error, hasSearched]);

  const recipe = useMemo<IRecipe | null>(() => {
    return recipes.find((r) => r.id === id) || null;
  }, [recipes, id]);

  if (isLoading) {
    return <p className="text-center">Loading recipe...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }
  if (!recipe) {
    return <p className="text-center">Recipe not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Recipe: {recipe?.name}</h1>
      <RecipeForm initialRecipe={recipe} />
    </div>
  );
};

export default EditRecipePage;
