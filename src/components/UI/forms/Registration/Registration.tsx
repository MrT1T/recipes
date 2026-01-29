'use client';

import { useState, FC } from 'react';
import { Form, Input, Button } from '@heroui/react';

import { registerUser } from '@/actions/register';

import { validationErrorMessages } from '@/constants/errorMessages';
import { validateEmail } from '@/utils';

export const RegistrationForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const result = await registerUser(formData);
    console.log('Registration result:', result);

    onClose();
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return validationErrorMessages.required;
          if (!validateEmail(value)) return validationErrorMessages.invalidEmail;
          return null;
        }}
      />
      <Input
        aria-label="Password"
        isRequired
        name="password"
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return validationErrorMessages.required;
          if (value.length < 6) return validationErrorMessages.minLength(6);
          if (value.length > 20) return validationErrorMessages.maxLength(20);
          return null;
        }}
      />
      <Input
        aria-label="Confirm Password"
        isRequired
        name="confirmPassword"
        label="Confirm Password"
        labelPlacement="outside"
        placeholder="Confirm your password"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        validate={(value) => {
          if (!value) return validationErrorMessages.required;
          if (value.length < 6) return validationErrorMessages.minLength(6);
          if (value.length > 20) return validationErrorMessages.maxLength(20);
          if (value !== formData.password) return validationErrorMessages.passwordsDoNotMatch;
          return null;
        }}
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};
