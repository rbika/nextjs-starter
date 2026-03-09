'use client'

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
import { authKeys } from '@/utils/query-keys'

const formSchema = z.object({
  email: z.email('Invalid email address'),
})

const defaultValues = {
  email: '',
}

const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useMutation({
    mutationKey: authKeys.forgotPassword(),
    mutationFn: async (email: string) => {
      await authClient.requestPasswordReset({
        email,
        redirectTo: '/reset-password',
      })
    },
    onSuccess: () => {
      toast.success('Check your email', {
        description: "We've sent you instructions to reset your password.",
        duration: 8000,
      })
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
      forgotPasswordMutation.mutate(value.email)
    },
  })

  return (
    <form
      id="forgot-password-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-6">
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
                  disabled={forgotPasswordMutation.isPending}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                )}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
    </form>
  )
}

const ForgotPasswordFormSubmit = () => {
  const isSendEmailPending =
    useIsMutating({
      mutationKey: authKeys.forgotPassword(),
    }) > 0

  return (
    <Field orientation="horizontal" className="flex justify-end">
      <Button
        type="submit"
        form="forgot-password-form"
        className="w-full"
        disabled={isSendEmailPending}
      >
        {isSendEmailPending ? 'Sending…' : 'Send reset password email'}
      </Button>
    </Field>
  )
}

export { ForgotPasswordForm, ForgotPasswordFormSubmit }
