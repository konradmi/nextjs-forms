'use client'

import { useContext } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Input from '@mui/material/Input'
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Item'

import { FormItemLayoutContext } from './ZodForm'
import type { FormItemLayout } from './ZodForm'

type FormInputProps = {
  name: string
  label?: string
  layoutSize?: keyof FormItemLayout['labelCol'] & keyof FormItemLayout['wrapperCol']
  type?: string
  parse?: (value: string) => string
  format?: (value: string) => string
} & React.ComponentProps<typeof Input>

const FormInput = ({ name, label, layoutSize, type, parse = value => value, format = value => value, ...rest }: FormInputProps) => {
  const { control, formState: { errors } } = useFormContext()
  const formItemLayout = useContext(FormItemLayoutContext)

  const getError = () => {
    return name.split('.').reduce((acc, curr) => {
      return acc?.[curr]
    }, (errors || {}) as any)
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            { formItemLayout && layoutSize
                ? (
                  <>
                    <Grid item xs={formItemLayout.labelCol[layoutSize].span}>
                      {label}
                    </Grid>
                    <Grid item xs={formItemLayout.wrapperCol[layoutSize].span}>
                      <Input
                        {...rest}
                        type={type}
                        error={!!getError()}
                        value={format(field.value)}
                        onChange={e => field.onChange(parse(e.target.value))}
                        onBlur={field.onBlur}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    { label && <label htmlFor={name}>{label}</label> }
                    <Input
                      {...rest}
                      type={type}
                      error={!!getError()}
                      value={format(field.value)}
                      onChange={e => field.onChange(parse(e.target.value))}
                      onBlur={field.onBlur}
                    />
                  </>
                )
             }
             { getError() && <div style={{ color: 'red' }}>{ getError()?.message as string }</div> }
          </>
        )}
      />
    </>
  )
}

export default FormInput
