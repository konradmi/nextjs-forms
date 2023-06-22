'use client'

import { useFormContext, Controller } from 'react-hook-form'
import Input from '@mui/material/Input'

type FormInputProps = {
  name: string
  type?: string
  parse?: (value: string) => string
  format?: (value: string) => string
} & React.ComponentProps<typeof Input>

const FormInput = ({ name, type, parse = value => value, format = value => value, ...rest }: FormInputProps) => {
  const { control, formState: { errors } } = useFormContext()

  const getError = () => {
    return name.split('.').reduce((acc, curr) => {
      return acc?.[curr]
    }, (errors || {}) as any)
  }

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...rest}
            type={type}
            error={!!getError()}
            value={format(field.value)}
            onChange={e => field.onChange(parse(e.target.value))}
            onBlur={field.onBlur}
          />
        )}
      />
      { getError() && <div style={{ color: 'red' }}>{ getError()?.message as string }</div> }
    </div>
  )
}

export default FormInput
