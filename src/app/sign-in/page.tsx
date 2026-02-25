'use client'

import Link from 'next/link'

import { Container } from '@/components/container'
import { SignInForm } from '@/components/sign-in-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { paths } from '@/utils/paths'

const SignInPage = () => {
  return (
    <Container className="flex justify-center">
      <Card className="mt-10 w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground w-full text-center">
            Don&apos;t have an account?{' '}
            <Link
              href={paths.signUp()}
              className="text-foreground hover:underline"
            >
              Sign up
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default SignInPage
