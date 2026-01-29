'use server';

import { signIn } from '@/auth';

export const signInUser = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    return result;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};
