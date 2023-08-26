import React from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd/lib/menu'

export const MenuItem = Menu.Item

export const WSMenu: React.FC<MenuProps> = ({
  children,
  className,
}) => {
  return <Menu className={className}>{children}</Menu>
}
