'use client'

import { useRouter } from 'next/navigation'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { paths } from '@/utils/paths'
import { authKeys } from '@/utils/query-keys'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .pipe(z.email('Invalid email address')),
    password: z
      .string()
      .min(1, 'Password is required')
      .pipe(z.string().min(8, 'Password should be at least 8 characters')),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const router = useRouter()

  const signUpMutation = useMutation({
    mutationKey: authKeys.signUp(),
    mutationFn: async (payload: {
      name: string
      email: string
      password: string
    }) => {
      const { data, error } = await authClient.signUp.email({
        ...payload,
        callbackURL: paths.app(),
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      router.push(paths.emailVerification())
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: ({ formApi }) => {
      formApi.validate('submit')
    },
    onSubmit: async ({ value }) => {
      signUpMutation.mutate(value)
    },
  })

  const isFormDisabled = signUpMutation.isPending || signUpMutation.isSuccess

  return (
    <form
      id="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-6">
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your name"
                  disabled={isFormDisabled}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your email"
                  disabled={isFormDisabled}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                )}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your password"
                  type="password"
                  disabled={isFormDisabled}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Confirm your password"
                  type="password"
                  disabled={isFormDisabled}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <Field orientation="horizontal" className="flex justify-end">
          <Button
            type="submit"
            form="sign-up-form"
            className="w-full"
            disabled={isFormDisabled}
          >
            {isFormDisabled ? 'Signing up…' : 'Sign up'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export { SignUpForm }
