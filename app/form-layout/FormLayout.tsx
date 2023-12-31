'use client'

import * as z from 'zod'

import { ZodForm, FormInput, FormSubmitButton, FormCancelButton, FormSubmitError } from '@/components/forms'
import { nameCreator } from '@/components/forms/ZodForm'

const schema = z.object({
  username: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  password: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
})

const initialValues = {
  username: '',
  password: '',
}

const formItemLayout = {
  labelCol: {
    xs: { span: 1 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 2 },
    sm: { span: 8 },
  },
}

const FormLayout = () => {
  const submitValidation = async (values: z.infer<typeof schema>) => {
    return Promise.resolve()
  }

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  const getName = nameCreator(schema)

  return (
    <>
      <h1>Form with layout</h1>
      <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema} submitValidation={submitValidation} formItemLayout={formItemLayout}>
        <FormInput name={getName('username')} label='Username SM' layoutSize='sm'/>
        <FormInput name={getName('password')} type='password' label='Password XS' layoutSize='xs'/>
        <div>
          <FormSubmitButton label='Login'/>
          <FormCancelButton/>
          <FormSubmitError error='The form submission failed'/>
        </div>
      </ZodForm>
    </>
  )
}

export default FormLayout
