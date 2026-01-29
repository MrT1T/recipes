export const validationErrorMessages = {
  required: 'This field is required.',
  invalidEmail: 'Please enter a valid email address.',
  passwordsDoNotMatch: 'Passwords do not match.',
  userExists: 'User with this email already exists.',
  minLength: (length: number) => `Please enter at least ${length} characters.`,
  maxLength: (length: number) => `Please enter no more than ${length} characters.`,
  invalidNumber: 'Please enter a valid non-negative number.',
};
