import React from 'react'
// component
import {
  WSCol,
  WSInput,
  WSPassword,
  WSRow,
  WSTitle,
} from 'src/component/common'
// constant
import { formLabelName, stepFormDetails } from 'src/utils/enums'

// Style
import './financialContact.less'

const FinancialContact: React.FC = () => {
  return (
    <div className='financial-contact-main-details'>
      <div className='financial-contact-main-details-form'>
        <WSTitle level={2} className='details-title'>
         {stepFormDetails.step3FinancialContact}
        </WSTitle>
        <p className='content'>{stepFormDetails.completeFinancialContent}</p>
        <div className='main-form'>
          <WSRow>
            <WSCol span={24}>
              <label className='form-label'>{formLabelName.name}</label>
            </WSCol>
            <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <WSInput
                name='firstNameFinancial'
                placeholder={formLabelName.firstName}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <WSInput
                name='middleNameFinancial'
                placeholder={formLabelName.middleName}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <WSInput
                name='lastNameFinancial'
                placeholder={formLabelName.lastName}
                className='form-control'
              />
            </WSCol>
          </WSRow>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.jobTitle}</label>
              <WSInput
                name='jobTitleFinancial'
                placeholder={formLabelName.enterYourDesignation}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.eMailAddress}</label>
              <WSInput
                name='emailFinancial'
                placeholder={formLabelName.enterEmailAddress}
                className='form-control'
              />
            </WSCol>
          </WSRow>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.officeTelephoneNumber}</label>
              <WSInput
                name='officeTelephoneNumberFinancial'
                placeholder={formLabelName.enterOfficeTelephoneNumber}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.directTelephoneNumber}</label>
              <WSInput
                name='directTelePhoneNumberFinancial'
                placeholder={formLabelName.enterOtherTelephoneNumber}
                className='form-control'
              />
            </WSCol>
          </WSRow>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.password}</label>
              <WSPassword
                name='passwordFinancial'
                placeholder={formLabelName.enterPassword}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.confirmPassword}</label>
              <WSPassword
                name='confirmPasswordFinancial'
                placeholder={formLabelName.enterPasswordAgain}
                className='form-control'
              />
            </WSCol>
          </WSRow>
        </div>
      </div>
    </div>
  )
}

export default FinancialContact