'use client';

import { RecipeForm } from '@/components/UI/forms/Recipe';

const NewRecipePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default NewRecipePage;
