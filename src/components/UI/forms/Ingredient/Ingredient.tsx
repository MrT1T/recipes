'use client';

import { useState, useTransition } from 'react';

import { Button, Form, Input, Select, SelectItem } from '@heroui/react';

import { useIngredientStore } from '@/store/ingredient.store';

import { CATEGORY_OPTIONS, UNIT_OPTIONS, validationErrorMessages, initialState } from './constants';

export const IngredientForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const { addIngredient } = useIngredientStore();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await addIngredient(formData);
      const storeError = useIngredientStore.getState().error;

      if (storeError) {
        setError(storeError);
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };

  const handleChange = (name: string, value: (typeof formData)[keyof typeof formData]) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Form className="w-full" action={handleSubmit}>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <Input
        isRequired
        name="name"
        label="Ingredient Name"
        placeholder="Enter ingredient name"
        type="text"
        value={formData.name}
        classNames={{ inputWrapper: 'bg-default-100', input: 'text-sm focus:outline-none' }}
        onChange={(e) => handleChange('name', e.target.value)}
        validate={(value) => {
          if (!value) return validationErrorMessages.required;
          return null;
        }}
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            label="Category"
            placeholder="Select category"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            label="Unit"
            placeholder="Select unit"
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) => handleChange('unit', e.target.value)}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            label="Price Per Unit"
            placeholder="Enter price per unit"
            type="number"
            min={0}
            value={formData?.pricePerUnit !== null ? formData.pricePerUnit.toString() : ''}
            classNames={{ inputWrapper: 'bg-default-100', input: 'text-sm focus:outline-none' }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              handleChange('pricePerUnit', value);
            }}
            endContent={
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">$</span>
            }
            validate={(value) => {
              if (!value) return validationErrorMessages.required;
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) return validationErrorMessages.invalidNumber;
              return null;
            }}
          />
        </div>
      </div>
      <Input
        name="description"
        label="Description"
        placeholder="Enter description"
        type="text"
        value={formData.description}
        classNames={{ inputWrapper: 'bg-default-100', input: 'text-sm focus:outline-none' }}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <div className="flex w-full items-center justify-end">
        <Button color="primary" type="submit" isLoading={isPending}>
          Add Ingredient
        </Button>
      </div>
    </Form>
  );
};
