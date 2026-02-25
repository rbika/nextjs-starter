import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Container } from '@/components/container'
import { auth } from '@/lib/auth'
import { paths } from '@/utils/paths'

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect(paths.app())
  }

  return (
    <Container className="mt-5">
      <p className="text-muted-foreground mt-3 text-base leading-relaxed">
        An opinionated starter template for building full-stack Next.js apps.
        <br />
        For more information, please visit the{' '}
        <Link
          href="https://github.com/rbika/nextjs-starter"
          className="text-foreground hover:text-primary hover:underline"
        >
          Github repository
        </Link>
        .
      </p>
    </Container>
  )
}

export default HomePage
