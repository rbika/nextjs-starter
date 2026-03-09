'use client'

import Link from 'next/link'

import { Container } from '@/components/container'
import {
  ForgotPasswordForm,
  ForgotPasswordFormSubmit,
} from '@/components/forgot-password-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { paths } from '@/utils/paths'

const ForgotPasswordPage = () => {
  return (
    <Container className="flex justify-center">
      <Card className="mt-10 w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you an email with
            instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col items-center gap-4">
            <ForgotPasswordFormSubmit />
            <Link
              href={paths.signIn()}
              className="text-muted-foreground hover:text-foreground text-center hover:underline"
            >
              Return to sign in page.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default ForgotPasswordPage
