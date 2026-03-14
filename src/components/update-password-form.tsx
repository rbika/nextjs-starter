'use client'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'

const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .pipe(z.string().min(8, 'New password should be at least 8 characters')),
    confirmNewPassword: z.string().min(1, 'Confirm new password is required'),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'New passwords do not match',
        path: ['confirmNewPassword'],
      })
    }
  })

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

const UpdatePasswordForm = () => {
  const updatePasswordMutation = useMutation({
    mutationFn: async (payload: {
      currentPassword: string
      newPassword: string
    }) => {
      const { data, error } = await authClient.changePassword({
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Password updated')
      form.reset()
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
      updatePasswordMutation.mutate(value)
    },
  })

  return (
    <form
      id="update-password-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field name="currentPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your current password"
                  disabled={updatePasswordMutation.isPending}
                  type="password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your new password"
                  disabled={updatePasswordMutation.isPending}
                  type="password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="confirmNewPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm New Password
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Confirm your new password"
                  disabled={updatePasswordMutation.isPending}
                  type="password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <Field orientation="horizontal" className="justify-end">
          <Button
            type="submit"
            form="update-password-form"
            disabled={updatePasswordMutation.isPending}
          >
            {updatePasswordMutation.isPending ? 'Updating…' : 'Update password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export { UpdatePasswordForm }
