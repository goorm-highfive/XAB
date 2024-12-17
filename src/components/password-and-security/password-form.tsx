'use client'

import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { PasswordFormField } from '~/components/password-and-security/password-form-field'
import { toast } from 'sonner'

export type FormDataType = {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

function PasswordForm() {
  const form = useForm<FormDataType>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  const updatePassword = (data: FormDataType): void => {
    toast.success('비밀번호가 변경되었습니다.')
    console.log(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <p className="mb-5 text-xl font-bold">Change Password</p>
      <form onSubmit={form.handleSubmit(updatePassword)} className="space-y-8">
        <PasswordFormField
          control={form.control}
          name="currentPassword"
          label="Current Password"
          type="password"
        />

        <PasswordFormField
          control={form.control}
          name="newPassword"
          label="New Password"
          type="password"
        />

        <PasswordFormField
          control={form.control}
          name="newPasswordConfirm"
          label="Confirm New Password"
          type="password"
        />
        <Button type="submit">Update Password</Button>
      </form>
    </Form>
  )
}

export { PasswordForm }
