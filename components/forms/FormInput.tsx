'use client'

import { useFormContext } from 'react-hook-form'
import Input from '@mui/material/Input'

type FormInputProps = {
  name: string
  type?: string
}

function FormInput ({ name, type }: FormInputProps) {
  const { register, formState: { errors } } = useFormContext()
  
  return (
    <div>
      <Input {...register(name)} type={type} error={!!errors[name]}/>
      { errors[name] && <div style={{ color: 'red' }}>{ errors[name]?.message as string }</div> }
    </div>
  )
}

export default FormInput
