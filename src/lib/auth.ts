import { waitUntil } from '@vercel/functions'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url }) => {
      waitUntil(
        // TODO: Send email with reset password link
        (async () => {
          console.log('>>> reset password url:', url)
        })(),
      )
    },
  },
})
