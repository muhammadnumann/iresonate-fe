import React from 'react'
import { Dropdown } from 'antd'
import { DropdownButtonProps } from 'antd/lib/dropdown'

export const WSDropdown: React.FC<DropdownButtonProps> = ({ children, overlay, className, placement, overlayClassName }) => {
  return <Dropdown overlay={overlay} 
  className={className} 
  placement={placement} 
  overlayClassName={overlayClassName}>
  {children}
  </Dropdown>
}
