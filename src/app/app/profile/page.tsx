import { headers } from 'next/headers'

import { Container } from '@/components/container'
import { UpdateNameForm } from '@/components/update-name-form'
import { UpdatePasswordForm } from '@/components/update-password-form'
import { auth } from '@/lib/auth'

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <Container className="mt-5 max-w-[600px]!">
      <div className="mb-8 text-3xl font-medium">Profile</div>

      <div className="flex flex-col gap-6">
        <div className="rounded-xl border p-4">
          <div className="mb-4 text-lg font-medium">Update Name</div>
          <UpdateNameForm initialName={session?.user?.name ?? ''} />
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-4 text-lg font-medium">Update Password</div>
          <UpdatePasswordForm />
        </div>
      </div>
    </Container>
  )
}

export default ProfilePage
