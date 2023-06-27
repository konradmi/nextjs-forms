'use client'

import React, { useEffect, createContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'
import Grid from '@mui/material/Grid'
import * as z from 'zod'

import type { SubmitHandler } from 'react-hook-form'
import { useForm, FormProvider } from 'react-hook-form'

export type FormItemLayout = {
  labelCol: {
    xs: { span: number }
    sm: { span: number }
  },
  wrapperCol: {
    xs: { span: number }
    sm: { span: number }
  }
}

type FormProps<T extends z.ZodType> = {
  initialValues: z.infer<T>
  onSubmit: SubmitHandler<z.infer<T>>
  submitValidation?: (values: z.infer<T>) => Promise<void>
  children: React.ReactNode
  className?: string
  schema: T
  fallback?: React.ReactNode
  formItemLayout?: FormItemLayout

}

export const FormItemLayoutContext = createContext<FormItemLayout | undefined>(undefined)

const ZodForm = <T extends z.ZodType>({ 
  initialValues, 
  onSubmit, 
  children, 
  className, 
  schema, 
  submitValidation = () => Promise.resolve() ,
  fallback,
  formItemLayout,
}: FormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    methods.reset(initialValues)
  }, [initialValues])

  const onSubmitWithValidation = async (values: z.infer<T>) => {
    let error = false
    try {
      await submitValidation(values)
    }
    catch {
      methods.setError('root.submit', {
        type: 'submit_error',
      })
      error = true
    }
    if(!error) {
      await onSubmit(values)
    }
  }
  
  const { isSubmitting } = methods.formState

  return (
    <FormProvider {...methods}>
      <FormItemLayoutContext.Provider value={formItemLayout}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmitWithValidation)}>
        { 
          (fallback && isSubmitting) 
            ? fallback 
            : formItemLayout
              ? <Grid container direction='column'>{children}</Grid>
              : children
        }
      </form>
      <DevTool control={methods.control} />
      </FormItemLayoutContext.Provider>
    </FormProvider>
  )
}

export const nameCreator = <T extends z.ZodType>(schema: T) => (name: keyof z.infer<T>): string => name as string

export default ZodForm
