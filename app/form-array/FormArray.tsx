'use client'

import * as z from 'zod'

import { ZodForm, FormInput, FormSubmitButton, FormCancelButton, FormArray } from '@/components/forms'
import type { RowProps } from '@/components/forms/FormArray'
import { nameCreator } from '@/components/forms/ZodForm'

const schema = z.object({
  firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  interests: z.array(z.object({
    name: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  }))
})

const initialValues = {
  firstName: '',
  interests: [{
    name: '',
  }],
}

const Row = ({ setName, appendNewRow, removeCurrentRow }: RowProps) => {
  return (
    <div style={{border: '1px solid black', marginBottom: 10}}>
      <label htmlFor='name'>Interest</label>
      <FormInput name={setName('name')}/>
      <button type='button' onClick={() => appendNewRow({ name: ''})}>+</button>
      <button type='button' onClick={removeCurrentRow}>-</button>
    </div>
  )
}

const FormWithArray = () => {
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values)
  }

  const getName = nameCreator(schema)

  return (
    <>
      <h1>WithLoader form</h1>
      <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput name={getName('firstName')}/>
      </div>
      <h3>Interests: </h3>
      <FormArray name={getName('interests')} row={Row}/>

      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
    </ZodForm>
    </>
  )
}

export default FormWithArray
