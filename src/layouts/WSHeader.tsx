import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// component
import { WSPopover, MenuTitle, WSDivider } from 'src/component/common'
// constant
import { getCurrentUser, getFirstName, localStorageClear } from 'src/utils/helper'
import routPath from 'src/routes/routes'
import { Roles } from 'src/typeGeneratedAdmin'
// style
import './WSHeader.less'

export const WSHeader: React.FC<{}> = ({ ...props }) => {
  const [userLogoState, setUserLogoState] = useState<boolean>(false)
  const currentUser = getCurrentUser()
  const { firstName, lastName } = getFirstName()
  const router = useRouter()
  const handleLogout = () => {
    if (currentUser.role === Roles.Enduser) {
      localStorageClear()
      router.push(routPath.donorLogin)
    } else if (currentUser.role === Roles.Vendor) {
      localStorageClear()
      router.push(routPath.webHostLogin)
    } else if (currentUser.role === Roles.ContentWriter) {
      localStorageClear()
      router.push(routPath.contentProviderLogin)
    } else {
      localStorageClear()
      router.push(routPath.adminLogin)
    }
  }

  const popoverProfile = (currentUser) => {
    switch (currentUser?.role) {
      case Roles.Admin:
        return (
          <>
            <MenuTitle
              inlineClassName='profile-title'
              name='My Profile'
              onClick={() => router.push(routPath.AdminProfile)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Change Password'
              onClick={() => router.push(routPath.UpdatePassword)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Logout'
              onClick={handleLogout}
            />
          </>
        )
      case Roles.Vendor:
        return (
          <>
            <MenuTitle
              name='My Profile'
              inlineClassName='profile-title'
              onClick={() => router.push(routPath.webHostProfile)}
            />
            <WSDivider className='title-divider' />

            <MenuTitle
              inlineClassName='profile-title'
              name='Change Password'
              onClick={() => router.push(routPath.UpdatePassword)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Logout'
              onClick={handleLogout}
            />
          </>
        )
      case Roles.Enduser:
        return (
          <>
            <MenuTitle
              name='My Profile'
              inlineClassName='profile-title'
              onClick={() => router.push(routPath.donorProfile)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Change Password'
              onClick={() => router.push(routPath.UpdatePassword)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Logout'
              onClick={handleLogout}
            />
          </>
        )
      case Roles.ContentWriter:
        return (
          <>
            <MenuTitle
              name='My Profile'
              inlineClassName='profile-title'
              onClick={() => router.push(routPath.contentProviderProfile)}
            />
            {/* <WSDivider className='title-divider' />TODO: need this code */} 
            {/* <MenuTitle
              name={
                data?.getUser.accountId
                  ? 'Edit your Bank Account'
                  : 'Add your Bank Account'
              }
              inlineClassName='profile-title'
              onClick={async (e) => {
                try {
                  await CallMutation(updateUser, {
                    variables: {
                      input: {
                        country: 'US',
                      },
                    },
                  })
                } catch (error) {
                  console.log(error)
                }
              }}
            /> */}
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Change Password'
              onClick={() => router.push(routPath.UpdatePassword)}
            />
            <WSDivider className='title-divider' />
            <MenuTitle
              inlineClassName='profile-title'
              name='Logout'
              onClick={handleLogout}
            />
          </>
        )
      default:
        return []
    }
  }
  return (
    <div className='ws-header-right-side-content'>
      <WSPopover
        trigger='click'
        visible={userLogoState}
        content={popoverProfile(currentUser)}
        placement='bottomRight'
        overlayClassName='top-nav-popover'
        onVisibleChange={() => setUserLogoState(!userLogoState)}
      >
        <div className='profile-menu'>
          <UserOutlined  className='profile-icon'/>
          {firstName} {lastName}
        </div>
      </WSPopover>
    </div>
  )
}
