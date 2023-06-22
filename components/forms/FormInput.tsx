'use client'

import { useFormContext, Controller } from 'react-hook-form'
import Input from '@mui/material/Input'

type FormInputProps = {
  name: string
  type?: string
  parse?: (value: string) => string
  format?: (value: string) => string
} & React.ComponentProps<typeof Input>

function FormInput ({ name, type, parse = value => value, format = value => value, ...rest }: FormInputProps) {
  const { control, formState: { errors } } = useFormContext()
  
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...rest}
            type={type}
            error={!!errors[name]}
            value={format(field.value)}
            onChange={e => field.onChange(parse(e.target.value))}
            onBlur={field.onBlur}
          />
        )}
      />
      { errors[name] && <div style={{ color: 'red' }}>{ errors[name]?.message as string }</div> }
    </div>
  )
}

export default FormInput
