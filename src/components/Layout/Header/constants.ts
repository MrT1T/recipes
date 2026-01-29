import { ROUTES } from '@/constants/routes';

export { ROUTES } from '@/constants/routes';
export { siteConfig } from '@/constants/site';
export { siteStyles } from '@/constants/styles';

export const navbarItems = [
  { label: 'Recipes', href: ROUTES.RECIPES, authOnly: false },
  { label: 'Ingredients', href: ROUTES.INGREDIENTS, authOnly: true },
  { label: 'About', href: ROUTES.ABOUT, authOnly: false },
];
