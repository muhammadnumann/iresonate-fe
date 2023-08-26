import React, { ReactNode } from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import { Field, FieldProps } from 'formik'
import { WSError } from '../errorMessage/WSError'

const CheckboxGroup = Checkbox.Group
interface LabelArrProps {
  value: string
  label: ReactNode | string
  qty?: number
  disable?: boolean
  color?: string
}
interface SelectProps extends CheckboxGroupProps {
  labelArr?: LabelArrProps[] | string[]
  className?: string
  name?: string
  value?: string[]
}

export const MyCheckboxGroup = ({ ...props }: SelectProps) => (
  <CheckboxGroup {...props} />
)

export const WSCheckbox = (props: SelectProps) => {
  const { labelArr, name = '', value } = props

  return (
    <>
      <Field name={name}>
        {({ form }: FieldProps) => (
          <CheckboxGroup
            onChange={(e) => {
              form.setFieldValue(name, e)
            }}
            options={labelArr}
            value={value}
            {...props}
          />
        )}
      </Field>
      <WSError name={name} />

    </>
  )
}
