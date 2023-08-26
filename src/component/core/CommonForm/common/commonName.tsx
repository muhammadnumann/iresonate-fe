import React from 'react'
// Component
import { WSRow, WSCol, WSInput } from 'src/component/common'
import { formLabelName } from 'src/utils/enums'
interface IProps {
  disabledFieldView?: boolean
}
const CommonName: React.FC<IProps> = ({ disabledFieldView }) => {
  return (
    <div>
      <WSRow gutter={[16, 10]}>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
              name='title'
              label={formLabelName.title}
              placeholder={formLabelName.title}
              inputLabel
              disabled={disabledFieldView ? true : false}
              className='form-control'
          />
        </WSCol>
        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='firstName'
            placeholder={formLabelName.firstName}
            inputLabel
            disabled={disabledFieldView ? true : false}
            className='form-control'
          />
        </WSCol>

        <WSCol xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <WSInput
            name='lastName'
            inputLabel
            placeholder={formLabelName.lastName}
            disabled={disabledFieldView ? true : false}
            className='form-control'
          />
        </WSCol>
      </WSRow>
    </div>
  )
}
export default CommonName
