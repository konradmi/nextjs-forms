import React from 'react'

import { 
  useFormContext,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove, 
  FieldValues,
} from 'react-hook-form'

export type RowProps = {
  setName: (rowName: string) => string
  appendNewRow: (row: object) => void
  removeCurrentRow: () => void
  isLastRow: boolean
}

type FormArrayProps = {
  name: string
  row: (props: RowProps) => JSX.Element
  children: (append: UseFieldArrayAppend<FieldValues>, remove: UseFieldArrayRemove, rows: JSX.Element[]) => JSX.Element
}

const FormArray = ({ name, row: Row, children  }: FormArrayProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })

  const removeRow = (index: number) => () => remove(index)

  const appendNewRow = (row: object) => append(row)

  const setName = (index: number) => (rowName: string) => `${name}.${index}.${rowName}`

  const rows = fields.map((field, index) => <Row key={field.id} setName={setName(index)} removeCurrentRow={removeRow(index)} appendNewRow={appendNewRow} isLastRow={fields.length - 1 === index}/>)

  return (
    <>
      { children(append, remove, rows) }
    </>
  )
}

export default FormArray
