export const ROUTES = {
  RECIPES: '/',
  INGREDIENTS: '/ingredients',
  ABOUT: '/about',
  RECIPES_NEW: '/recipes/new',
  RECIPES_EDIT: (id: string) => `/recipes/${id}`,
};
