import { waitUntil } from '@vercel/functions'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'
import { sendResetPasswordEmail } from '@/emails/send-reset-password-email'
import { sendVerificationEmail } from '@/emails/send-verification-email'

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
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      waitUntil(sendResetPasswordEmail(user.name, user.email, url))
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      waitUntil(sendVerificationEmail(user.name, user.email, url))
    },
  },
})
