import React from 'react'
// component
import { WSCol, WSInput, WSRow, WSTitle } from 'src/component/common'
//constant
import { formLabelName, stepFormDetails } from 'src/utils/enums';
// Style 
import "./technicalContact.less";

const TechnicalContact: React.FC = () => {
  return (
    <div className="technical-contact-main-details">
      <div className="technical-contact-main-details-form">
        <WSTitle level={2} className="details-title">{stepFormDetails.step4TechnicalContact}</WSTitle>
        <p className="content">{stepFormDetails.technicalContact}</p>
        <div className="technical-contact-main-form">
          <WSRow>

            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className="form-label">Title</label>
              <select className="form-select ant-input form-control" aria-label="Default select example">
                <option value={1}>Mr</option>
                <option value={2}>Mrs</option>
              </select>
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <WSRow>
                <WSCol span={24} className="p-0"><label className="form-label">{formLabelName.name}</label></WSCol>
                <WSCol className="p-0" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <WSInput name="firstNameTechnical" placeholder={formLabelName.firstName} className="form-control" />
                </WSCol>
                <WSCol className="pe-0" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <WSInput name="lastNameTechnical" placeholder={formLabelName.lastName} className="form-control" />
                </WSCol>
              </WSRow>
            </WSCol>

          </WSRow>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className="form-label">{formLabelName.jobTitle}</label>
              <WSInput name="jobTitleTechnical" placeholder={formLabelName.enterJobTitle} className="form-control" />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className="form-label">{formLabelName.eMailAddress}</label>
              <WSInput name="emailTechnical" placeholder={formLabelName.enterEmailAddress} className="form-control" />
            </WSCol>
          </WSRow>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className="form-label">{formLabelName.officeTelephoneNumber}</label>
              <WSInput name="officeTelephoneNumberTechnical" placeholder={formLabelName.enterOfficeTelephoneNumber} className="form-control" />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className="form-label">{formLabelName.directTelephoneNumber}</label>
              <WSInput name="directTelePhoneNumberTechnical" placeholder={formLabelName.enterOtherTelephoneNumber} className="form-control" />
            </WSCol>
          </WSRow>
        </div>
      </div>
    </div>
  )
}

export default TechnicalContact