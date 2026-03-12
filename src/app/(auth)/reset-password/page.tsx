'use client'

import { Container } from '@/components/container'
import {
  ResetPasswordForm,
  ResetPasswordFormSubmit,
} from '@/components/reset-password-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ResetPasswordPage = () => {
  return (
    <Container className="flex justify-center">
      <Card className="mt-10 w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter>
          <ResetPasswordFormSubmit />
        </CardFooter>
      </Card>
    </Container>
  )
}

export default ResetPasswordPage
