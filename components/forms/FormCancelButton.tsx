'use client'

import Button from '@mui/material/Button'
import { useFormContext } from 'react-hook-form'

const FormCancelButton = () => {
  const { reset } = useFormContext()
  
  const onClick = () => {
    reset()
  }

  return (
    <Button type='button' onClick={onClick}>Cancel</Button>
  )
}

export default FormCancelButton
