export const authKeys = {
  all: ['auth'] as const,
  signUp: () => [...authKeys.all, 'signUp'] as const,
  signIn: () => [...authKeys.all, 'signIn'] as const,
  forgotPassword: () => [...authKeys.all, 'forgotPassword'] as const,
  resetPassword: () => [...authKeys.all, 'resetPassword'] as const,
}
