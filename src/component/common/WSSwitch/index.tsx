import React, { FC } from 'react'
import { Switch } from 'antd'
import { SwitchProps } from 'antd/lib/switch'

interface WSSwitchProps extends SwitchProps {
  className?: string
  onClick?: (e) => void
  checked?:boolean
}

export const WSSwitch: FC<WSSwitchProps> = ({ className, onClick, loading, checked, onChange}) => {
  return <Switch className={className} onClick={onClick} checked={checked} onChange={onChange} loading={loading} />
}
