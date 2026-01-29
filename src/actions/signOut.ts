'use server';

import { signOut } from '@/auth';

export const signOutUser = async () => {
  try {
    const result = await signOut({ redirect: false });
    return result;
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
};
