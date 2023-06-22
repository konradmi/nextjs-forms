import { 
  useFormContext, 
  useFieldArray, 
  UseFieldArrayAppend, 
  UseFieldArrayRemove, 
  FieldValues 
} from 'react-hook-form'

export type RowProps = {
  setName: (rowName: string) => string
  append: UseFieldArrayAppend<FieldValues>
  remove: UseFieldArrayRemove
}

type FormArrayProps = {
  name: string
  row: (props: RowProps) => JSX.Element
}

const FormArray = ({ name, row: Row }: FormArrayProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const setName = (index: number) => (rowName: string) => `${name}.${index}.${rowName}`

  return fields.map((field, index) => (
    <Row key={field.id} setName={setName(index)} remove={remove} append={append}/>
  ))
  
}

export default FormArray
