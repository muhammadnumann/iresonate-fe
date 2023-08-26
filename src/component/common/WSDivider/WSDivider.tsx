import React from 'react'
import './WSDivider.less';
import { Divider } from 'antd'
import { DividerProps } from 'antd/lib/divider'

export const WSDivider: React.FC<DividerProps> = ({ children, ...props }) => {
  return <Divider {...props}>{children}</Divider>
}
