'use client'

import type { Control } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import type { FormDataType } from '~/components/password-and-security/password-form'

type FormProps = {
  control: Control<FormDataType>
  name: keyof FormDataType
  label: string
  type: string
}

function PasswordFormField({ control, name, label, type }: FormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { PasswordFormField }
