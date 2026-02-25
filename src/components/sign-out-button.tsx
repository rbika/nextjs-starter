'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { paths } from '@/utils/paths'
import { Button } from './ui/button'

const SignOutButton = () => {
  const router = useRouter()

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      router.push(paths.signIn())
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSignOut = () => {
    signOutMutation.mutate()
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}

export { SignOutButton }
