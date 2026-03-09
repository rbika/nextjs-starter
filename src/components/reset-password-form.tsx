'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useForm } from '@tanstack/react-form'
import { useIsMutating, useMutation } from '@tanstack/react-query'
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
  password: '',
  confirmPassword: '',
}

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const resetPasswordMutation = useMutation({
    mutationKey: authKeys.resetPassword(),
    mutationFn: async (payload: {
      password: string
      confirmPassword: string
    }) => {
      if (!token) throw new Error('Token is required')

      const { data, error } = await authClient.resetPassword({
        newPassword: payload.password,
        token,
      })

      if (error) throw error
      return data
    },
    onSuccess: () => {
      router.push(paths.signIn())
      toast.success('Password reset successfully')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Failed to reset password. Please try again.',
      )
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
      resetPasswordMutation.mutate(value)
    },
  })

  return (
    <form
      id="reset-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-6">
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
                  disabled={resetPasswordMutation.isPending}
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
                  disabled={resetPasswordMutation.isPending}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
    </form>
  )
}

const ResetPasswordFormSubmit = () => {
  const isResetPending =
    useIsMutating({
      mutationKey: authKeys.resetPassword(),
    }) > 0

  return (
    <Field orientation="horizontal" className="flex justify-end">
      <Button
        type="submit"
        form="reset-form"
        className="w-full"
        disabled={isResetPending}
      >
        {isResetPending ? 'Resetting…' : 'Reset Password'}
      </Button>
    </Field>
  )
}

export { ResetPasswordForm, ResetPasswordFormSubmit }
