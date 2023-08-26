import React from 'react'
// component 
import { WSLoader} from 'src/component/common'
import PasswordUpdate from './Password'
import { HeadElement } from 'src/component/core'
// constant
import { getCurrentUser } from 'src/utils/helper'
import {
  ResetPasswordMemberMutation,
  ResetPasswordAdminMutation,
} from 'src/schema/memberSchema'
import metaTitle from 'src/utils/metaTitle'
import { Roles } from 'src/typeGeneratedAdmin'

const UpdatePassword: React.FC<{}> = () => {
  const currentUser = getCurrentUser()

  const { mutate: ResetPasswordMember, loading: loadingMember } =
    ResetPasswordMemberMutation()

  const { mutate: ResetPasswordAdmin, loading: loadingAdmin } =
    ResetPasswordAdminMutation()

  return (
    <div className='update-password'>
      {!currentUser ? (
        <WSLoader />
      ) : (
        <>
          <HeadElement title={metaTitle.ChangePassword} />
          {currentUser?.role === Roles.Enduser && (
            <div className='form-width'>
              <PasswordUpdate
                updatefun={ResetPasswordMember}
                loading={loadingMember}
              />
            </div>
          )}
          {currentUser?.role === Roles.Admin && (
            <PasswordUpdate
              updatefun={ResetPasswordAdmin}
              loading={loadingAdmin}
            />
          )}
          {currentUser?.role === Roles.Vendor && (
            <PasswordUpdate
              updatefun={ResetPasswordAdmin}
              loading={loadingAdmin}
            />
          )}
          {currentUser?.role === Roles.ContentWriter && (
            <PasswordUpdate
              updatefun={ResetPasswordAdmin}
              loading={loadingMember}
            />
          )}
        </>
      )}
    </div>
  )
}

export default UpdatePassword
