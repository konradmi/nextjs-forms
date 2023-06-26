'use client'

import { useState } from 'react'
import * as z from 'zod'
import Input from '@mui/material/Input'

import { ZodForm, FormInput, FormSubmitButton, FormCancelButton, FormArray } from '@/components/forms'
import type { RowProps, InitialRowProps } from '@/components/forms/FormArray'
import { nameCreator } from '@/components/forms/ZodForm'

const schema = z.object({
  firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  interests: z.array(z.object({
    name: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  }))
})

const initialValuesNoInitialRow = {
  firstName: '',
  interests: [{
    name: '',
  }],
}

const initialValuesWithInitialRow = {
  firstName: '',
  interests: [],
}

const Row = ({ setName, appendNewRow, removeCurrentRow, isLastRow }: RowProps) => {
  const emptyRow = { name: '' }
  return (
    <div style={{border: '1px solid black', marginBottom: 10}}>
      <label htmlFor='name'>Interest</label>
      <FormInput name={setName('name')}/>
      { isLastRow && <button type='button' onClick={() => appendNewRow(emptyRow)}>+</button>}
      <button type='button' onClick={removeCurrentRow}>-</button>
    </div>
  )
}

const InitialRow = ({ appendNewRow }: InitialRowProps) => {
  const [name, setName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleClick = () => {
    appendNewRow({ name })
    setName('')
  }

  return (
    <div style={{border: '1px solid black', marginBottom: 10}}>
      <label htmlFor='name'>Interest</label>
      <Input onChange={handleChange} value={name}/>
      <button type='button' onClick={handleClick}>+</button>
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
      <h1>Form without initial row</h1>
      <ZodForm initialValues={initialValuesNoInitialRow} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput name={getName('firstName')}/>
      </div>
      <h3>Interests: </h3>
      <FormArray name={getName('interests')} row={Row}/>

      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
    </ZodForm>
    <br/>
    <h1>Form with initial row</h1>
      <ZodForm initialValues={initialValuesWithInitialRow} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput name={getName('firstName')}/>
      </div>
      <h3>Interests: </h3>
      <FormArray name={getName('interests')} row={Row} initialRow={InitialRow}/>

      <FormSubmitButton label='Submit'/>
      <FormCancelButton/>
    </ZodForm>
    </>
  )
}

export default FormWithArray
