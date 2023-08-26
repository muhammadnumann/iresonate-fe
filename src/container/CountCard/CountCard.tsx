import React from 'react'
import { WSTitle } from 'src/component/common/title/WSTitle'
import './CountCard.less'

interface CountCardProps {
  title: string
  count: string
  icon?: React.ReactNode
  color?:string
}

const CountCard: React.FC<CountCardProps> = ({
  title,
  count,
  icon,
  color
}) => {
  return (
    <div className='number-card-container d-flex'>
      <div className='number-card-icon'
        style={{backgroundColor:color}}>
        {icon}
      </div>
      <div className='number-card-text-container'>
        <WSTitle level={5} className="number-card-title">{title}</WSTitle>
        <div>
        <WSTitle level={5} className="number-card-count">{count}</WSTitle>
        </div>
      </div>
    </div>
  )
}

export default CountCard
