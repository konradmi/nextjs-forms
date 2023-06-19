'use client'

import { useFormContext } from 'react-hook-form'

type FormSubmitErrorProps = {
  error: string
}

const FormSubmitError = ({ error }: FormSubmitErrorProps) => {
  const { formState: { errors } } = useFormContext()
  
  return (
    <div>
      { errors?.root?.submit.type === 'submit_error' && <div style={{ color: 'red' }}>{error}</div> }
    </div>
  )
}

export default FormSubmitError
