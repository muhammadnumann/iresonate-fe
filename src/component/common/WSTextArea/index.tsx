import React from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Field, FieldProps } from 'formik'
import { TextAreaProps } from 'antd/lib/input'
//components
import { WSError } from '../errorMessage/WSError';
// constant
import { camelCaseToNormalCase } from 'src/utils/helper';

interface CustomInputProps extends TextAreaProps {
  label?: string
  name: string
  className?:string
}

export const MyTextArea = ({ ...props }: TextAreaProps) => (
  <TextArea {...props}  />
)

export const WSTextArea = ({ label, name, className, ...props }: CustomInputProps) => {
  return (
    <div className='ws-textarea'>
      <div className='textarea-label'>
        <label>{camelCaseToNormalCase(label || name || '')}</label>
      </div>
      <Field name={name} >
        {({ field }: FieldProps) => (
          <MyTextArea {...field} {...props} />
        )}
      </Field>
      <WSError name={name} />
    </div>
  )
}