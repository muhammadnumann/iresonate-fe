import React, { ReactNode } from 'react'
import { Form } from 'formik'
import { MutationFunction } from '@apollo/client'
// Component
import SliderComponent from 'src/layouts/MainLayout'
import CommonForm from 'src/component/core/CommonForm'
import { WSButton, WSCol, WSInput, WSLoader, WSRow, WSTitle } from 'src/component/common'
import {
  CommonName,
  PhysicalAddressCommon,
} from 'src/component/core/CommonForm/common'
// constants
import { ContentWriterDetail } from 'src/typeGeneratedAdmin'
import { formLabelName } from 'src/utils/enums'

export interface EditContentWriterProps {
  initialData?: ContentWriterDetail
  loading?: boolean
  disabledFieldView?: boolean
  markupDisabled?:boolean
  mutateLoading?: boolean
  mutate?: MutationFunction
  onSubmit?: (e) => void
  addBankAccount?:boolean
  addBankButtonName?:string
  bankBtnLoading?:boolean
  bankBtnSubmit?:(e) => void
  cardTitle:string
  copyScriptClickURL?:ReactNode
}

export interface EditContentWriterFormProps {
  firstName?: string
  title?: string
  lastName?: string
  email?: string
  mobileNumber?: string
  landlineNumber?: string
  markUp?: string | number
  // Physical Address
  pStreetAddress?: string
  pPostalCode?: string
  pCity?: string
  pState?: string
  pCountry?: string
  // Mailing Address
  mStreetAddress?: string
  mPostOfficeBoxNumber?: string
  mPostalCode?: string
  mCity?: string
  mState?: string
  mCountry?: string
}

const EditContentWriters = ({ onSubmit, loading,markupDisabled, disabledFieldView,
  mutateLoading,
  addBankAccount,
  addBankButtonName,
  bankBtnLoading,
  bankBtnSubmit,
  cardTitle,
  copyScriptClickURL
}: EditContentWriterProps) =>
{
  return (
    <>
      <SliderComponent>
        {loading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100" />
        ) : (
          <Form>
            <CommonForm cardTile={cardTitle}
              addBankAccount={addBankAccount}
              addBankButtonName={addBankButtonName}
              bankBtnLoading={bankBtnLoading}
              bankBtnSubmit={bankBtnSubmit}
              copyScriptClickURL={copyScriptClickURL}
            >
              <CommonName disabledFieldView={disabledFieldView} />
              <WSRow gutter={[16, 10]}>
                <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <WSInput name="markUp" label="Mark Up (%)" inputLabel maxLength={2} disabled={disabledFieldView || markupDisabled} />
                </WSCol>
              </WSRow>
              <PhysicalAddressCommon disabledFieldView={disabledFieldView} />
              {/*<MailingAddress disabledFieldView={disabledFieldView} />*/}
              <WSTitle level={5} className='mb-1 mt-1'>
                {formLabelName.contactDetails}
              </WSTitle>
              <WSRow gutter={[16, 10]}>
                <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <WSInput
                    name='email'
                    disabled
                    label={formLabelName.eMailAddress}
                    placeholder={formLabelName.eMailAddress}
                    inputLabel
                    className='form-control'
                  />
                </WSCol>
                <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <WSInput
                    name='mobileNumber'
                    inputLabel
                    disabled={disabledFieldView ? true : false}
                    placeholder={formLabelName.mobileNumber}
                    className='form-control'
                  />
                </WSCol>
              </WSRow>
              <WSRow justify="center">
                <WSCol span={24}>
                  <div className="d-flex justify-content-center mt-1">
                  {!disabledFieldView && <WSButton
                    type='primary'
                    onClick={onSubmit}
                    loading={mutateLoading}
                  >
                    {mutateLoading ? formLabelName.submitting : formLabelName.submit}
                  </WSButton>}
                </div>
                </WSCol>
              </WSRow>
            </CommonForm>
          </Form>
        )}
      </SliderComponent>
    </>
  )
}

export default EditContentWriters
