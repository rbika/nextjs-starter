import { waitUntil } from '@vercel/functions'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'
import { sendResetPasswordEmail } from '@/emails/send-reset-password-email'

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
    sendResetPassword: async ({ user, url }) => {
      waitUntil(sendResetPasswordEmail(user.name, user.email, url))
    },
  },
})
