import React from 'react'
import { WSRow, WSCol, WSInput, WSTitle } from 'src/component/common'
import { formLabelName } from 'src/utils/enums'

interface IProps {
  disabledFieldView?: boolean
}
const PhysicalAddressCommon: React.FC<IProps> = ({disabledFieldView}) => {
  return (
    <div>
      <WSTitle level={5} className='mb-1 mt-1'>
        {formLabelName.physicalAddress}
      </WSTitle>
      <WSRow gutter={[16, 16]}>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='pStreetAddress'
            label={formLabelName.streetAddress}
            inputLabel
            disabled={disabledFieldView ? true : false}
            placeholder={formLabelName.streetAddress}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='pPostalCode'
            label={formLabelName.postalCode}
            inputLabel
            disabled={disabledFieldView ? true : false}
            placeholder={formLabelName.postalCode}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='pCity'
            label={formLabelName.city}
            inputLabel
            placeholder={formLabelName.city}
            disabled={disabledFieldView ? true : false}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='pState'
            label={formLabelName.state}
            inputLabel
            disabled={disabledFieldView ? true : false}
            placeholder={formLabelName.state}
            className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='pCountry'
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
export default PhysicalAddressCommon
