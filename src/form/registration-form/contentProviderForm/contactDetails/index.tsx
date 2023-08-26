import React from 'react'
import { WSCol, WSInput, WSPassword, WSRow, WSTitle } from 'src/component/common'
import { Form } from 'formik'

// Style
import "./contactDetails.less";
import { useRouter } from "next/router";

const ContactDetails = ({ setFieldValue, initialData, errors }: any) => {
  const router = useRouter()
  const { token } = router?.query

  return (
    <Form>
      <div className="main-details">
        <div className="content-details-form">
          <WSTitle level={2} className="details-title">Step 2. Contact Details</WSTitle>
          <p className="content">Enter your contact information and create password</p>
          <div className="main-form">
            <WSRow>
              <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <label className="form-label">E-mail address</label>
                <WSInput name="email" disabled={!!token} placeholder="Enter E-mail address" className="form-control" />
              </WSCol>
              <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <label className="form-label">Mobile Number</label>
                <WSInput name="mobileNumber" placeholder="Enter Mobile Number" className="form-control" />
              </WSCol>
            </WSRow>
            <WSRow>
              {/* <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                <label className="form-label">Landline Number</label>
                <WSInput name="landLineNumber" placeholder="Enter Landline Number" className="form-control" />
              </WSCol> */}
              <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                <div className="form-password">
                  <label className="form-label">Password</label>
                  <WSPassword name="password" placeholder="Enter Password" className="form-control" />
                </div>
              </WSCol>
              {/* <WSCol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <div className="form-password">
                <label className="form-label">Confirm Password</label>
                <WSPassword name="confirmPassword" placeholder="Enter Password Again" className="form-control" />
                </div>
              </WSCol> */}
            </WSRow>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ContactDetails
