'use client';

import { useIngredientStore } from '@/store/ingredient.store';
import { useAuthStore } from '@/store/auth.store';
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Button,
} from '@heroui/react';
import { TABLE_COLUMNS } from './constants';

export const IngredientsTable = () => {
  const { ingredients, isLoading, removeIngredient } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    removeIngredient(id);
  };

  if (!isAuth) {
    return <p className="mt-4">Please log in to view ingredients.</p>;
  }

  return !isLoading ? (
    <Table
      aria-label="List of ingredients"
      classNames={{
        wrapper: 'mt-4',
        table: 'w-full',
        th: 'text-black',
        td: 'text-black',
      }}
    >
      <TableHeader columns={TABLE_COLUMNS}>
        {(column) => {
          return <TableColumn key={column.key}>{column.header}</TableColumn>;
        }}
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id} className="first-letter:uppercase">
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>{ingredient.category}</TableCell>
            <TableCell>{ingredient.unit}</TableCell>
            <TableCell>{ingredient.pricePerUnit ?? 'N/A'}</TableCell>
            <TableCell>{ingredient.description ?? 'N/A'}</TableCell>
            <TableCell>
              <Button color="danger" size="sm" onPress={() => handleDelete(ingredient.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="mt-4">Loading...</p>
  );
};
