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

const LoginForm = () => {
  const submitValidation = async (values: z.infer<typeof schema>) => {
    return Promise.resolve()
  }

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  const getName = nameCreator(schema)

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema} submitValidation={submitValidation}>
      <h1>Login</h1>
      <div>
        <label htmlFor='username'>Username</label>
        <FormInput name={getName('username')}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <FormInput name={getName('password')} type='password'/>
      </div>
      <FormSubmitButton label='Login'/>
      <FormCancelButton/>
      <FormSubmitError error='The form submission failed'/>
    </ZodForm>
  )
}

export default LoginForm
