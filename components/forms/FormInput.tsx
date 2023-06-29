'use client'
import Input from '@mui/material/Input'

import FormElement from './FormElement'
import type { ComponentProps, FormElementProps } from './FormElement'

type FormInputProps = FormElementProps & React.ComponentProps<typeof Input>

const WrappedInput = ({ value, onChange, onBlur, ...rest }: ComponentProps) => {
  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      {...rest}
    />
  )
}

const FormInput = (props: FormInputProps) => {
  return (
    <FormElement {...props} component={WrappedInput}/>
  )
}

export default FormInput
