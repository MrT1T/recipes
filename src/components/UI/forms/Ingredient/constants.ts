export { validationErrorMessages } from '@/constants/errorMessages';
export { UNIT_OPTIONS } from '@/constants/unit';

export const CATEGORY_OPTIONS = [
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'meat', label: 'Meat' },
  { value: 'grains', label: 'Grains' },
  { value: 'spices', label: 'Spices' },
  { value: 'oils', label: 'Oils' },
  { value: 'others', label: 'Others' },
] as const;

export const initialState = {
  name: '',
  category: '',
  unit: '',
  pricePerUnit: null as number | null,
  description: '',
};
