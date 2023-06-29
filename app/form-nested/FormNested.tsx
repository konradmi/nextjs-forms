'use client'

import * as z from 'zod'

import { ZodForm, FormInput, FormSubmitButton, FormCancelButton, FormSubmitError } from '@/components/forms'
import { nameCreator } from '@/components/forms/ZodForm'

const schema = z.object({
  data: z.object({
    private: z.object({
      firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
      lastName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
    })
  })
})

const initialValues = {
  data: {
    private: {
      firstName: '',
      lastName: '',
    }
  }
}

const FormNested = () => {
  const submitValidation = async (values: z.infer<typeof schema>) => {
    return Promise.resolve()
  }

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema} submitValidation={submitValidation}>
      <h1>Login</h1>
      <div>
        <label htmlFor='data.private.firstName'>First Name</label>
        <FormInput name='data.private.firstName'/>
      </div>
      <div>
        <label htmlFor='data.private.lastName'>Last Name</label>
        <FormInput name='data.private.lastName'/>
      </div>
      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
      <FormSubmitError error='The form submission failed'/>
    </ZodForm>
  )
}

export default FormNested
