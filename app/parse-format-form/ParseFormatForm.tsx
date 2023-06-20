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
    console.log('values', values)
  }

  const parseFirstName = (value: string) => {
    return value.toLowerCase()
  }

  const formatFirstName = (value: string) => {
    return value.toUpperCase()
  }

  const handlePhone = (value: string) => {
    return value.startsWith('+48') ? value : `+48 ${value}`
  }

  const getName = nameCreator(schema)

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema}>
      <h1>ParseFormat form</h1>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput name={getName('firstName')} format={formatFirstName} parse={parseFirstName}/>
      </div>
      <div>
        <label htmlFor='phone'>Phone</label>
        <FormInput name={getName('phone')} format={handlePhone} parse={handlePhone}/>
      </div>
      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
    </ZodForm>
  )
}

export default ParseFormatForm
