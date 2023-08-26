import React, { ReactNode, useState } from 'react'
import { FormikErrors } from 'formik'
// Component
import { WSRow, WSCol, WSCard, WSInput, WSLoader, WSButton } from 'src/component/common'
import WebsiteSteps from '../../vendor-list/website'
import FinancialSteps from '../../vendor-list/financial'
// import TechnicalSteps from '../../vendor-list/technical'
import CommonForm from 'src/component/core/CommonForm'
import { PhysicalAddressCommon } from 'src/component/core/CommonForm/common'
// constant
import { formLabelName } from 'src/utils/enums'
import { EditProfileWebHostFormProps } from 'src/form/webHost/profile/updateProfile'
import { EditAdminWebHostFormProps } from '../webhost-edit-page/web-Host-edit'
// Style
import './editWebHost.less'

interface WebHostEditProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
  btnLoading?: boolean
  values?: EditProfileWebHostFormProps & EditAdminWebHostFormProps
  errors?: FormikErrors<EditAdminWebHostFormProps>
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void
  cardTitle: string
  addBankAccount?: boolean
  addBankButtonName?: string
  bankBtnLoading?: boolean
  bankBtnSubmit?: (e) => void
  copyScriptClickURL?: ReactNode
}
const EditVendorForm: React.FC<WebHostEditProps> = ({
  loading,
  btnLoading,
  values,
  onSubmit,
  setFieldValue,
  errors,
  cardTitle,
  addBankAccount,
  addBankButtonName,
  bankBtnLoading,
  bankBtnSubmit,
  copyScriptClickURL
}) => {
  const [cardStep, setCardStep] = useState<string>(formLabelName.addYourWebsite)

  const tabTitle = [
    {
      key: formLabelName.addYourWebsite,
      tab: formLabelName.addYourWebsite,
    }
  ]
  const TabContent = (key) => <WebsiteSteps
    setFieldValue={setFieldValue}
    errors={errors}
    websiteIntitialValue={values}
  />

  return (
    <>
      {loading ? (
        <WSLoader className='d-flex justify-content-center align-items-center h-100' />
      ) : (
        <>
          <CommonForm
            cardTile={cardTitle}
            addBankAccount={addBankAccount}
            addBankButtonName={addBankButtonName}
            bankBtnLoading={bankBtnLoading}
            bankBtnSubmit={bankBtnSubmit}
            copyScriptClickURL={copyScriptClickURL}
          >
            <WSRow gutter={[16, 16]}>
              <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                <WSInput
                  name='webhostCorporateName'
                  inputLabel
                  placeholder={formLabelName.name}
                  className='form-control'
                />
              </WSCol>
            </WSRow>
            <PhysicalAddressCommon />
            {/*<MailingAddress />*/}
            <div className="mt-1">
              <WSRow gutter={[16, 16]}>
                <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <WSInput
                    name='primaryTelephoneNumber'
                    inputLabel
                    placeholder={formLabelName.enterTelephoneNumber}
                    className='form-control'
                  />
                </WSCol>
                <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <WSInput
                    name='platformCharges'
                    inputLabel
                    placeholder={formLabelName.platformCharges}
                    className='form-control'
                  />
                </WSCol>
              </WSRow>
            </div>
            <WSCard
              className='mt-3 web-host-step-card'
              bordered={false}
              tabList={tabTitle}
              activeTabKey={cardStep}
              onTabChange={(key: string) => {
                setCardStep(key)
              }}
            >
              {TabContent(cardStep)}
            </WSCard>
            <WSRow justify="center">
              <WSCol span={24}>
                <div className="d-flex justify-content-center mt-1">
                  <WSButton
                    type='primary'
                    onClick={() => onSubmit()}
                    loading={btnLoading}
                  >
                    {btnLoading ? formLabelName.submitting : formLabelName.submit}
                  </WSButton>
                </div>
              </WSCol>
            </WSRow>
          </CommonForm>
        </>
      )}
    </>
  )
}

export default EditVendorForm
