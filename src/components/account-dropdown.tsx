'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { UserRoundIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { paths } from '@/utils/paths'

const AccountDropdown = () => {
  const { data: session } = authClient.useSession()
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
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon">
            <UserRoundIcon className="size-4.5" />
          </Button>
        }
      />
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled
            className="flex flex-col items-start gap-1"
          >
            <span className="w-full truncate text-sm font-medium">
              {session?.user?.name}
            </span>
            <span className="text-muted-foreground w-full truncate text-xs">
              {session?.user?.email}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={<Link href={paths.profile()}>Profile</Link>}
          />
          <DropdownMenuItem
            disabled={signOutMutation.isPending}
            onClick={handleSignOut}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { AccountDropdown }
