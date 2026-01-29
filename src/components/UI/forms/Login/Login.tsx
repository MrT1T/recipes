'use client';

import { useState, FC } from 'react';
import { Form, Input, Button } from '@heroui/react';

import { signInUser } from '@/actions/signIn';

import { validationErrorMessages } from '@/constants/errorMessages';
import { validateEmail } from '@/utils';

export const LoginForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInUser(formData.email, formData.password);

    window.location.reload();

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
          return null;
        }}
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Login
        </Button>
      </div>
    </Form>
  );
};
