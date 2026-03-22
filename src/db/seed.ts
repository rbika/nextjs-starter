import { eq } from 'drizzle-orm'

import { auth } from '@/lib/auth'
import { db } from './drizzle'
import { user as userTable } from './schema'

const user = {
  name: 'User',
  email: 'user@example.com',
  password: process.env.SEED_PASSWORD as string,
}

const seedUsers = async () => {
  const response = await auth.api.signUpEmail({
    body: user,
  })
  await db
    .update(userTable)
    .set({ emailVerified: true })
    .where(eq(userTable.id, response.user.id))
}

const seed = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Seed script cannot run in production.')
    process.exit(1)
  }

  try {
    await db.delete(userTable)
    await seedUsers()
    console.log('🌱 Seeding successful.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()
