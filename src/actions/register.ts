'use server';

import prisma from '@/utils/prisma';

import { validationErrorMessages } from '@/constants/errorMessages';
import type { IFormData } from '@/types/form-data';
import { saltAndHashPassword } from '@/utils/password';

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;

  try {
    if (password !== confirmPassword) {
      return { error: validationErrorMessages.passwordsDoNotMatch };
    }
    if (password.length < 6) {
      return { error: validationErrorMessages.minLength(6) };
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return { error: validationErrorMessages.userExists };
    }

    const pwHashed = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: pwHashed,
      },
    });
    console.log('User created:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
