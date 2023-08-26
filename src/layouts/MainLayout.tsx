import React, { ReactNode, useEffect, useState } from 'react'
import { Layout as WSLayout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// component
import { WSHeader } from './WSHeader' 

// constant
import { getCurrentUser } from '../utils/helper'
import {
  layoutAdminSidebar,
  layoutContentWriterSidebar,
  layoutMemberSidebar,
  layoutWebHostSidebar,
} from 'src/utils/staticData'
import routPath from 'src/routes/routes'
import { Roles } from 'src/typeGeneratedAdmin'
// styles
import './MainLayout.less'

interface Props {
  children?: ReactNode
}

const { Header, Sider, Content } = WSLayout

const currentUser = getCurrentUser()

const SliderComponent: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const updateDimensions = () => {
    const windowsWidth = document.getElementById('__next')?.offsetWidth || 0
    setCollapsed(windowsWidth < 992)
    // const width = document.getElementById('sider')?.offsetWidth || null TODO:need this codes
    // width && setWidth(width)
  }
  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])
  useEffect(() => {
    if (!currentUser) {
      window.location.replace('/')
    }
  }, [currentUser])
  const router = useRouter()

  let currentRoute = ''
  if (typeof window !== 'undefined') {
    currentRoute = window.location.pathname
  }
  return (
    <WSLayout className='main-layout'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={collapsed ? 'collapsed-menu' : 'open-menu'}
        width={200}
        id='sider'
      >
        <div className='sider-logo'>
          <span onClick={() => router.push(routPath.DashboardScreen)}>
            iResonate
          </span>
        </div>
        {currentUser?.role === Roles.Vendor && (
          <Menu
            theme='dark'
            mode='inline'
            defaultOpenKeys={[currentRoute.split('/')[1]]}
            inlineCollapsed={collapsed}
          >
            {layoutWebHostSidebar.map(
              ({ routesArray, key, name, link, icon }) => {
                const activePath = routesArray?.includes(currentRoute)
                return (
                  <Menu.Item
                    key={key}
                    className={`${activePath ? 'menu-item' : 'menu-color'}`}
                  >
                    {icon}
                    <Link href={{ pathname: link }}>{name}</Link>
                  </Menu.Item>
                )
              }
            )}
          </Menu>
        )}

        {currentUser?.role === Roles.Enduser && (
          <Menu
            theme='dark'
            mode='inline'
            defaultOpenKeys={[currentRoute.split('/')[1]]}
            inlineCollapsed={collapsed}
          >
            {layoutMemberSidebar.map(
              ({ routesArray, key, name, link, icon }) => {
                const activePath = routesArray?.includes(currentRoute)
                return (
                  <Menu.Item
                    key={key}
                    className={`${activePath ? 'menu-item' : 'menu-color'}`}
                  >
                    {icon}
                    <Link href={{ pathname: link }}>{name}</Link>
                  </Menu.Item>
                )
              }
            )}
          </Menu>
        )}

        {currentUser?.role === Roles.Admin && (
          <Menu
            theme='dark'
            mode='inline'
            defaultOpenKeys={[currentRoute.split('/')[1]]}
            inlineCollapsed={collapsed}
          >
            {layoutAdminSidebar.map(
              ({ routesArray, key, name, link, icon }) => {
                const activePath = routesArray?.includes(currentRoute)
                return (
                  <Menu.Item
                    key={key}
                    className={`${activePath ? 'menu-item' : 'menu-color'}`}
                  >
                    {icon}
                    <Link href={{ pathname: link }}>{name}</Link>
                  </Menu.Item>
                )
              }
            )}
          </Menu>
        )}
        {currentUser?.role === Roles.ContentWriter && (
          <Menu
            theme='dark'
            mode='inline'
            defaultOpenKeys={[currentRoute.split('/')[1]]}
            inlineCollapsed={collapsed}
          >
            {layoutContentWriterSidebar.map(
              ({ routesArray, key, name, link, icon }) => {
                const activePath = routesArray?.includes(currentRoute)
                return (
                  <Menu.Item
                    key={key}
                    className={`${activePath ? 'menu-item' : 'menu-color'}`}
                  >
                    {icon}
                    <Link href={{ pathname: link }}>{name}</Link>
                  </Menu.Item>
                )
              }
            )}
          </Menu>
        )}
      </Sider>
      <WSLayout className='site-layout'>
        <Header className='main-header'>
          <div
            className={collapsed ? 'collapsed-button-none' : 'collapsed-button'}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle,
              }
            )}
          </div>
          <WSHeader />
        </Header>
        <Content className='content-background'>
          {children}
        </Content>
      </WSLayout>
    </WSLayout>
  )
}

export default SliderComponent
