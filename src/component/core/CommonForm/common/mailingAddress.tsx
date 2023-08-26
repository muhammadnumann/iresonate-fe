import React from 'react'
import { WSCol, WSInput, WSRow, WSTitle } from 'src/component/common'
import { formLabelName } from 'src/utils/enums'

interface MailingAddressProps {
  postOfficeBoxNumber?: boolean
  disabledFieldView?: boolean
}
const MailingAddress: React.FC<MailingAddressProps> = ({
  postOfficeBoxNumber,
  disabledFieldView,
}) => {
  return (
    <div>
      <WSTitle level={5} className='mb-1 mt-1'>
        {formLabelName.mailingAddress}
      </WSTitle>
      <WSRow gutter={[16, 16]}>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='mStreetAddress'
            disabled={disabledFieldView ? true : false}
            label={formLabelName.streetAddress}
            placeholder={formLabelName.streetAddress}
            inputLabel
            className='form-control'
          />
        </WSCol>
        {postOfficeBoxNumber && (
          <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
            <WSInput
              name='mPostOfficeBoxNumber'
              disabled={disabledFieldView ? true : false}
              label={formLabelName.postOfficeBoxNumber}
              placeholder={formLabelName.postOfficeBoxNumber}
              inputLabel
              className='form-control'
            />
          </WSCol>
        )}
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='mPostalCode'
            label={formLabelName.postalCode}
            disabled={disabledFieldView ? true : false}
            placeholder={formLabelName.postalCode}
            inputLabel
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='mCity'
            label={formLabelName.city}
            disabled={disabledFieldView ? true : false}
            inputLabel
            placeholder={formLabelName.city}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='mState'
            label={formLabelName.state}
            inputLabel
            disabled={disabledFieldView ? true : false}
            placeholder={formLabelName.state}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='mCountry'
            label={formLabelName.country}
            disabled={disabledFieldView ? true : false}
            inputLabel
            placeholder={formLabelName.country}
            className='form-control'
          />
        </WSCol>
      </WSRow>
    </div>
  )
}
export default MailingAddress
