import { FormItemProps } from 'antd/lib/form'
import { Form } from 'antd'
import React, { FC } from 'react'

export const WSFormItem: FC<FormItemProps> = ({ children, ...props }) => {
  return <Form.Item {...props}>{children}</Form.Item>
}
