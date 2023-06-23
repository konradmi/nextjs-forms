import { useEffect } from 'react'

import { 
  useFormContext, 
  useFieldArray, 
} from 'react-hook-form'

export type RowProps = {
  setName: (rowName: string) => string
  appendNewRow: (row: object) => void
  removeCurrentRow: () => void
}

type FormArrayProps = {
  name: string
  row: (props: RowProps) => JSX.Element
}

const FormArray = ({ name, row: Row }: FormArrayProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })

  const removeRow = (index: number) => () => remove(index)

  const appendNewRow = (row: object) => append(row)

  const setName = (index: number) => (rowName: string) => `${name}.${index}.${rowName}`

  return (
    <>
      { fields.map((field, index) => <Row key={field.id} setName={setName(index)} removeCurrentRow={removeRow(index)} appendNewRow={appendNewRow}/>)}
    </>
  )
}

export default FormArray
