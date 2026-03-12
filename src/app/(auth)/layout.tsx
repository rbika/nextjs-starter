import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { paths } from '@/utils/paths'

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect(paths.app())
  }

  return <div>{children}</div>
}

export default AuthLayout
