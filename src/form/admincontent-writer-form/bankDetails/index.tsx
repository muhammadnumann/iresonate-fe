import React from 'react'
import { MyCheckboxGroup, MyInput, WSCol, WSInput, WSRow, WSTitle } from 'src/component/common'

// Style 
import "./bankDetails.less";

const BankDetails:React.FC = () => {
  return (
    <div className="main-details">
        <div className="main-details-form">
          <WSTitle level={2} className="details-title">Step 3. Bank Details</WSTitle>
          <p className="content">Enter you bank details to receive your donations</p>
          <div className="main-form">
          <WSRow>
              <WSCol span={8}>
                <label className="form-label">Bank Name</label>
                <WSInput name="bankName" placeholder="Enter your bank name" className="form-control" />
              </WSCol>
              <WSCol span={8}>
                <label className="form-label">Bank Address</label>
                <WSInput name="bankAddress" placeholder="Enter your bank address" className="form-control" />
              </WSCol>
              <WSCol span={8}>
                <label className="form-label">P.O. Box Number</label>
                <WSInput name="bankPoBox" placeholder="Enter your p.o box number" className="form-control" />
              </WSCol>
            </WSRow>
            <WSRow>
              <WSCol span={8}>
                <label className="form-label">Routing/ABA Number</label>
                <WSInput name="bankRouter" placeholder="Enter Routing/ABA number" className="form-control" />
              </WSCol>
              <WSCol span={8}>
              <label className="form-label">City</label>
                <WSInput name="bankCity" placeholder="Enter your City" className="form-control"/>
              </WSCol>
              <WSCol span={8}>
              <label className="form-label">State</label>
                <WSInput name="bankState" placeholder="Enter your State" className="form-control" />
              </WSCol>
              <WSCol span={8}>
              <label className="form-label">Postal Code</label>
                <WSInput name="bankPostalCode" placeholder="Enter your Postal Code" className="form-control" />
              </WSCol>
              <WSCol span={8}>
              <label className="form-label">Country</label>
                <WSInput name="bankCountry" placeholder="Enter your Country" className="form-control" />
              </WSCol>
            </WSRow>
            <WSRow>
            <WSCol span={12}>
                <label className="form-label">Account Name</label>
                <WSInput name="accountName" placeholder="Enter Account Name" className="form-control" />
              </WSCol>
              <WSCol span={12}>
                <label className="form-label">Account Number</label>
                <WSInput name="accountNumber" placeholder="Enter Account Number" className="form-control" />
              </WSCol>
            </WSRow>
            <WSRow>
            <WSCol span={24}><label className="form-label">Account Type</label></WSCol>
            <WSCol span={8}>
                <MyCheckboxGroup className="terms-conditions-checkbox">Checking Account</MyCheckboxGroup>              
            </WSCol>
              <WSCol span={8}>
              <MyCheckboxGroup className="terms-conditions-checkbox">Saving Account</MyCheckboxGroup>       
              </WSCol>
            </WSRow>
          </div>
        </div>
    </div>
  )
}

export default BankDetails