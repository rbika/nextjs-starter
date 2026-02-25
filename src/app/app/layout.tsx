/**
 * This layout is used to protect all routes under `/app`
 * and redirect to the sign in page if the user is not authenticated.
 */

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { paths } from '@/utils/paths'

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(paths.signIn())
  }

  return <div>{children}</div>
}

export default AppLayout
