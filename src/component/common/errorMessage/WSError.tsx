import React from 'react'
import { ErrorMessage } from 'formik'
import { Typography } from 'antd'

import './ErrorMessage.less'
interface Props {
  name: string
  className?:string
}

const { Text } = Typography

export const WSError = (props: Props) => {
  const { name,className } = props
  return (
      <Text type='danger' className="ws-error">
          <ErrorMessage className={`invalid-feedback ${className}`} name={name} component="div" />
      </Text>
  )
}
