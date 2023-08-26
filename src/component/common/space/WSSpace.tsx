import React, { FC } from 'react'
import { Space } from 'antd'
import { SpaceProps } from 'antd/lib/space'


export const WSSpace: FC<SpaceProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Space {...props} className={`${className || ''} ws-space`}>
      {children}
    </Space>
  )
}
