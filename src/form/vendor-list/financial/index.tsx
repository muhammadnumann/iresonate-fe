import React from 'react';
// component
import { WSInput, WSCol, WSRow, WSTitle } from 'src/component/common';
// constant
import { formLabelName } from 'src/utils/enums';
// Style
import "../../admin/webHostList-edit-form/editWebHost.less"

const FinancialSteps: React.FC = () => {
  return (
    <div className="financial-main-details">
      <div className="main-details-form">
        <WSTitle level={5} className="details-title">{formLabelName.financialContact}</WSTitle>
        <div className="financial-main-form">
        <WSRow gutter={[16, 16]}>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='f_firstName'
            placeholder={formLabelName.firstName}
            inputLabel
            label={formLabelName.firstName}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='f_title'
            placeholder={formLabelName.title}
            inputLabel
            label={formLabelName.title}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='f_lastName'
            inputLabel
            label={formLabelName.lastName}
            placeholder={formLabelName.lastName}
            className='form-control'
          />
        </WSCol>
      </WSRow>
        <div className="mt-1">
          <WSRow gutter={[16, 10]}>
            <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
              <label className="form-label">{formLabelName.jobTitle}</label>
              <WSInput name="f_designation" placeholder={formLabelName.enterYourDesignation} className="form-control" />
            </WSCol>
            <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
              <label className="form-label">{formLabelName.eMailAddress}</label>
              <WSInput name="f_email" placeholder={formLabelName.enterEmailAddress} className="form-control" />
            </WSCol>
          </WSRow>
          </div>
          <WSRow gutter={[16, 10]}>
            <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
              <label className="form-label">{formLabelName.officeTelephoneNumber}</label>
              <WSInput name="f_phoneNumber" placeholder={formLabelName.enterOfficeTelephoneNumber} className="form-control" />
            </WSCol>
            <WSCol xs={24} sm={12} md={12} lg={12} xl={10} xxl={8}>
              <label className="form-label">{formLabelName.directTelephoneNumber}</label>
              <WSInput name="f_telephoneNumber" placeholder={formLabelName.enterOtherTelephoneNumber} className="form-control" />
            </WSCol>
          </WSRow>
        </div>
      </div>
    </div>
  )
}

export default FinancialSteps;
