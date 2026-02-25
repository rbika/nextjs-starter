export const authKeys = {
  all: ['auth'] as const,
  signUp: () => [...authKeys.all, 'signUp'] as const,
  signIn: () => [...authKeys.all, 'signIn'] as const,
}
