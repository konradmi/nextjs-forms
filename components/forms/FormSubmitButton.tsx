'use client'

import Button from '@mui/material/Button'
import { useFormContext } from 'react-hook-form'

type FormSubmitButtonProps = {
  label: string
}

const FormSubmitButton = ({ label }: FormSubmitButtonProps) => {
  const { formState: { isDirty, isValid, isSubmitSuccessful, isLoading } } = useFormContext()

  const isDisabled = !isDirty || !isValid || isSubmitSuccessful || isLoading
  
  return (
    <Button type='submit' disabled={isDisabled}>{label}</Button>
  )
}

export default FormSubmitButton
