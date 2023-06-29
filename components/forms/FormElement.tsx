'use client'

import { useContext } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'

import { FormItemLayoutContext } from './ZodForm'
import type { FormItemLayout } from './ZodForm'

export type ComponentProps = {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error? : boolean
}

export type FormElementProps = Omit<InternalFormElementProps, 'component'>

type InternalFormElementProps = {
  component: (props: ComponentProps) => JSX.Element
  name: string
  label?: string
  layoutSize?: keyof FormItemLayout['labelCol'] & keyof FormItemLayout['wrapperCol']
  parse?: (value: string) => string
  format?: (value: string) => string
}

const FormElement = ({ name, label, layoutSize, parse = value => value, format = value => value, component: Component, ...rest }: InternalFormElementProps) => {
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
                  <Grid container direction='row'>
                    <Grid item xs={formItemLayout.labelCol[layoutSize].span}>
                      {label}
                    </Grid>
                    <Grid item xs={formItemLayout.wrapperCol[layoutSize].span}>
                      <Component
                        {...rest}
                        error={!!getError()}
                        value={format(field.value)}
                        onChange={value => field.onChange(parse(value))}
                        onBlur={field.onBlur}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    { label && <label htmlFor={name}>{label}</label> }
                    <Component
                      {...rest}
                      error={!!getError()}
                      value={format(field.value)}
                      onChange={value => field.onChange(parse(value))}
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

export default FormElement
