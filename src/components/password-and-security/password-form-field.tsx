'use client'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '~/components/ui/form'

import { Input } from '~/components/ui/input'
import { Control, FieldValues } from 'react-hook-form'

interface FormProps {
  control: Control<FieldValues>
  name: string
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
