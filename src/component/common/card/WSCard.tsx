import React, { FC } from 'react'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
// Style 
import "./WSCard.less"

export const WSCard: FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <Card {...props} className={`${className} ws-card`}>
    {children}
    </Card>
  )
}
