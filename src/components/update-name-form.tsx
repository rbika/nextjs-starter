'use client'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

const UpdateNameForm = ({ initialName }: { initialName: string }) => {
  const updateNameMutation = useMutation({
    mutationFn: async (payload: { name: string }) => {
      const { data, error } = await authClient.updateUser({
        name: payload.name,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Name updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      name: initialName,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: ({ formApi }) => {
      formApi.validate('submit')
    },
    onSubmit: async ({ value }) => {
      updateNameMutation.mutate(value)
    },
  })

  return (
    <form
      id="update-name-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
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
                  disabled={updateNameMutation.isPending}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <Field orientation="horizontal" className="justify-end">
          <Button
            type="submit"
            form="update-name-form"
            disabled={updateNameMutation.isPending}
          >
            {updateNameMutation.isPending ? 'Updating…' : 'Update name'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export { UpdateNameForm }
