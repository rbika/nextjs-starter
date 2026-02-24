'use client'

import Link from 'next/link'

import { Container } from '@/components/container'
import { SignUpForm } from '@/components/sign-up-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const SignUpPage = () => {
  return (
    <Container className="flex justify-center">
      <Card className="mt-10 w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground w-full text-center">
            Already have an account?{' '}
            <Link href="" className="text-foreground hover:underline">
              Sign in
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default SignUpPage
