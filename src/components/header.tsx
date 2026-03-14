import { headers } from 'next/headers'
import Link from 'next/link'

import { RocketIcon } from 'lucide-react'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { paths } from '@/utils/paths'
import { AccountDropdown } from './account-dropdown'
import { ThemeSwitcher } from './theme-switcher'

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-20 h-12 w-full border-b">
      <Container className="flex h-full items-center justify-between">
        <Link href={paths.home()} className="flex items-center gap-2">
          <RocketIcon className="size-6" />
          <h1 className="text-xl font-bold">Nextjs Starter</h1>
        </Link>

        {!session ? (
          <div className="flex items-center gap-2">
            <ThemeSwitcher variant="button" />
            <Button
              render={<Link href={paths.signUp()} />}
              nativeButton={false}
            >
              Sign up
            </Button>
            <Button
              variant="outline"
              render={<Link href={paths.signIn()} />}
              nativeButton={false}
            >
              Sign in
            </Button>
          </div>
        ) : (
          <AccountDropdown />
        )}
      </Container>
    </nav>
  )
}

export { Header }
