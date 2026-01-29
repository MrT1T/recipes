import { useState, useTransition, FC } from 'react';
import { Button, Form, Input, Select, SelectItem } from '@heroui/react';

import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/store/recipe.store';
import { useIngredientStore } from '@/store/ingredient.store';

import { ROUTES } from '@/constants/routes';
import { validationErrorMessages } from '@/constants/errorMessages';

import type { IRecipe } from '@/types/recipe';

interface IRecipeFormProps {
  initialRecipe?: IRecipe;
}

interface IIngredientField {
  id: number;
  ingredientId: string;
  quantity: number | null;
}

const initialState = {
  name: '',
  description: '',
  imageUrl: '',
};

export const RecipeForm: FC<IRecipeFormProps> = ({ initialRecipe }) => {
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialRecipe?.name || initialState.name,
    description: initialRecipe?.description || initialState.description,
    imageUrl: initialRecipe?.imageUrl || initialState.imageUrl,
  });

  const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
    initialRecipe
      ? initialRecipe.ingredients.map((ing, index) => ({
          id: index,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
        }))
      : [{ id: 0, ingredientId: '', quantity: null }]
  );

  const { ingredients } = useIngredientStore();
  const { addRecipe, updateRecipe } = useRecipeStore();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddIngredientField = () => {
    if (ingredientFields.length < 10) {
      setIngredientFields([
        ...ingredientFields,
        { id: ingredientFields.length, ingredientId: '', quantity: null },
      ]);
    }
  };

  const handleRemoveIngredientField = (id: number) => {
    if (ingredientFields.length > 1) {
      setIngredientFields(ingredientFields.filter((field) => field.id !== id));
    }
  };

  const handleIngredientChange = (
    id: number,
    fieldKey: keyof IIngredientField,
    value: string | number | null
  ) => {
    setIngredientFields(
      ingredientFields.map((field) => (field.id === id ? { ...field, [fieldKey]: value } : field))
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);

      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, formData)
        : await addRecipe(formData);

      if (result.success) {
        setIngredientFields([{ id: 0, ingredientId: '', quantity: null }]);
        router.push(ROUTES.RECIPES);
        setFormData(initialState);
      } else {
        setError(result.error || 'Failed to save recipe');
      }
    });
  };

  return (
    <Form action={handleSubmit} className="w-[450px]">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Input
        isRequired
        name="name"
        placeholder="Enter recipe name"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => (!value ? validationErrorMessages.required : null)}
      />

      <Input
        name="description"
        placeholder="Enter recipe description"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <Input
        name="imageUrl"
        placeholder="Enter image URL"
        type="url"
        value={formData.imageUrl}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <div className="space-y-2 w-full">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Select
              isRequired
              name={`ingredient_${index}`}
              placeholder="Select ingredient"
              selectedKeys={field.ingredientId ? [field.ingredientId] : []}
              classNames={{
                trigger: 'bg-default-100 w-full',
                innerWrapper: 'text-sm',
                value: 'truncate',
                selectorIcon: ' text-black',
              }}
              onChange={(e) => handleIngredientChange(field.id, 'ingredientId', e.target.value)}
            >
              {ingredients.map((ingredient) => (
                <SelectItem key={ingredient.id} className="text-black">
                  {ingredient.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              name={`quantity_${index}`}
              placeholder="Quantity"
              type="number"
              value={field.quantity !== null ? field.quantity.toString() : ''}
              classNames={{
                inputWrapper: 'bg-default-100 w-full',
                input: 'text-sm focus:outline-none',
              }}
              className="w-[100px]"
              onChange={(e) =>
                handleIngredientChange(
                  field.id,
                  'quantity',
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
              validate={(value) =>
                !value || parseFloat(value) ? null : validationErrorMessages.minLength(0)
              }
            />
            {ingredientFields.length > 1 && (
              <Button
                color="danger"
                variant="light"
                onPress={() => handleRemoveIngredientField(field.id)}
                className="w-[40px]"
              >
                -
              </Button>
            )}
          </div>
        ))}

        {ingredientFields.length < 10 && (
          <Button color="primary" variant="flat" onPress={handleAddIngredientField}>
            +
          </Button>
        )}
      </div>

      <div className="flex w-full items-center justify-end mt-4">
        <Button type="submit" color="primary" isLoading={isPending}>
          {initialRecipe
            ? isPending
              ? 'Updating...'
              : 'Update Recipe'
            : isPending
              ? 'Adding...'
              : 'Add Recipe'}
        </Button>
      </div>
    </Form>
  );
};
