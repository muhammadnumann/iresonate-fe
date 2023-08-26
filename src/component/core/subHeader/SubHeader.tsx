import React, { FC } from 'react'
import { BlockProps } from 'antd/lib/typography/Base'
//Component
import { WSTitle } from 'src/component/common'
// Style
import './SubHeader.less'

declare const TITLE_ELE_LIST: [1, 2, 3, 4, 5]

export declare type TitleProps = Omit<
  BlockProps & {
    level?: typeof TITLE_ELE_LIST[number]
  },
  'strong'
>

interface SubHeaderProps {
  level: typeof TITLE_ELE_LIST[number]
  title: string
}

export const SubHeader: FC<SubHeaderProps> = ({ title, level, children }) => { 
  return (
    <div className='sub-header'>
      {title && <WSTitle level={level}>{title}</WSTitle>}
      {children}
    </div>
  )
}
