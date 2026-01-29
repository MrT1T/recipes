import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
