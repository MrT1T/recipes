import { create } from 'zustand';

import type { IIngredient } from '@/types/ingredients';
import { createIngredient, deleteIngredient, getIngredients } from '@/actions/ingredient';

interface IngredientState {
  ingredients: IIngredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getIngredients();

      if (response.success) {
        set({ ingredients: response.ingredients, isLoading: false });
      } else {
        set({ error: response.error || 'Failed to load ingredients', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message || 'Failed to load ingredients', isLoading: false });
    }
  },
  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createIngredient(formData);
      if (response.success) {
        set((state) => ({
          ingredients: [...state.ingredients, response.ingredient],
          isLoading: false,
        }));
      } else {
        set({ error: response.error || 'Failed to add ingredient', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message || 'Failed to add ingredient', isLoading: false });
    }
  },
  removeIngredient: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await deleteIngredient(id);
      if (response.success) {
        set((state) => ({
          ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: response.error || 'Failed to delete ingredient', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message || 'Failed to delete ingredient', isLoading: false });
    }
  },
}));
