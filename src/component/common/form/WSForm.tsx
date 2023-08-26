import React, { FC } from 'react'
import Form from 'antd/lib/form'
import { FormikFormProps } from 'formik'
import { FormProps } from 'antd/lib/form'
import './WsForm.less'

interface props {
  className?:string
}

type WSFormProps = FormikFormProps & FormProps & props

export const WSForm: FC<WSFormProps> = ({ children,className,...props }) => {
  return <Form {...props} className={`${className} ws-form`}>{children}</Form>
}
