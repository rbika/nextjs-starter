export const authKeys = {
  all: ['auth'] as const,
  signUp: () => [...authKeys.all, 'signUp'] as const,
}
