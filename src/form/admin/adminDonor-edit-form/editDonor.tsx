import React from 'react'
// Component
import { WSInput, WSRow, WSCol, WSPassword, WSButton } from 'src/component/common'
import {
  CommonName,
  MailingAddress,
} from 'src/component/core/CommonForm/common'
import CommonForm from 'src/component/core/CommonForm'
import { formLabelName } from 'src/utils/enums'
// Style
import './editDonor.less'

interface EditDonorProps {
  onSubmit: (e) => void
  loading: boolean
  isEdit?: boolean
  mainCardTitle?:string
}

const AddMemberForm: React.FC<EditDonorProps> = ({
  onSubmit,
  loading,
  isEdit,
  mainCardTitle
}) => {
  return (
    <>
      <CommonForm
        cardTile={mainCardTitle}>
        <CommonName />
        <div className="mt-1">
        <WSRow gutter={[16, 24]} >
          <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
            <WSInput
              name='email'
              label={formLabelName.emailAddress}
              inputLabel
              className='form-control'
              placeholder={formLabelName.emailAddress}
              disabled
            />
          </WSCol>
          <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
            <WSInput name='mobileNumber' inputLabel className='form-control' placeholder={formLabelName.mobileNumber}/>
          </WSCol>
        </WSRow>
        </div>
        <MailingAddress />
        <WSRow justify="center">
            <WSCol span={24}>
              <div className="d-flex justify-content-center mt-1">
                <WSButton
                  type='primary'
                  onClick={onSubmit}
                  loading={loading}
                >
                    {loading ? formLabelName.submitting : formLabelName.submit}
                </WSButton>
              </div>
            </WSCol>
        </WSRow>
      </CommonForm>
      {!isEdit && (
        <WSRow gutter={[16, 16]}>
          <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
            <label className='form-label'>{formLabelName.password}</label>
            <WSPassword
              type='password'
              name='password'
              placeholder={formLabelName.password}
              className='form-control'
            />
          </WSCol>
          <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
            <label className='form-label'>{formLabelName.confirmPassword}</label>
            <WSPassword
              type='confirm_password'
              name='confirm_password'
              placeholder={formLabelName.confirmPassword}
              className='form-control'
            />
          </WSCol>
        </WSRow>
      )}
    </>
  )
}

export default AddMemberForm
