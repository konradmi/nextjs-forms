'use client'

import * as z from 'zod'

import { ZodForm, FormInput, FormSubmitButton, FormCancelButton } from '@/components/forms'
import { nameCreator } from '@/components/forms/ZodForm'

const schema = z.object({
  firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  phone: z.string().min(9, { message: 'Too short'}).max(20, { message: 'Too long'}),
})

const initialValues = {
  firstName: '',
  phone: '',
}

const ParseFormatForm = () => {
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(values)
      }, 3000)
    })
  }

  const getName = nameCreator(schema)

  const fallback = 'Loading...'

  return (
    <>
      <h1>WithLoader form</h1>
      <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema} fallback={fallback}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput name={getName('firstName')}/>
      </div>
      <div>
        <label htmlFor='phone'>Phone</label>
        <FormInput name={getName('phone')}/>
      </div>
      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
    </ZodForm>
    </>
  )
}

export default ParseFormatForm
