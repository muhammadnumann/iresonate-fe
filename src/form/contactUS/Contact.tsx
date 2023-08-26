import React,{ useEffect } from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { InjectedFormikProps, Form } from 'formik'
import {
  WSButton,
  WSCol,
  WSInput,
  WSRow,
  WSTextArea,
  WSTitle,
} from 'src/component/common'
import messageHelper from 'src/utils/message'
import { ContactUsFormProps, ContactUsIProps } from '.'
import { formLabelName } from 'src/utils/enums'

//Style
import './style.less'

const ContactUsPage: React.FC<
  InjectedFormikProps<ContactUsIProps, ContactUsFormProps>
> = ({
  handleSubmit,
  setFieldValue,
  loading,
  successMessage,
  setSuccessMessage,
  ...props
}) => {

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSuccessMessage(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [successMessage])
  
  return (
    <Form>
      <section className='contact mt-5' id="contact_section">
        <WSTitle level={3} className='text-center title'>
        {formLabelName.contactUs}
        </WSTitle>
        <div className='container'>
          <div className='d-flex justify-content-center contact-success-message' >
          {successMessage && <div className='success-message'> <CheckCircleOutlined className='checkOutlined-icon' /> {messageHelper.ContactUsSuccess}</div>}
          </div>
          <WSRow className='mt-4'>
            <WSCol xs={24} sm={24} md={12} lg={{ span:10,offset:2}}  xl={{ span:10,offset:2}} xxl={{ span:11,offset:2}}>
              <div className='form-group'>
                <WSInput
                  placeholder={formLabelName.fullName}
                  name='fullname'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <WSInput
                  placeholder={formLabelName.emailAddress}
                  name='email'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <WSInput
                  placeholder={formLabelName.mobileNumber}
                  name='mobileNumber'
                  className='form-control'
                />
              </div>
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={10} xl={10} xxl={11}>
              <div className='form-group'>
                <WSTextArea
                  name='message'
                  placeholder={formLabelName.message}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <WSButton
                  loading={loading}
                  onClick={() => handleSubmit()}
                  className='submit-btn'
                >
                  {loading ? formLabelName.submitting : formLabelName.submit}
                </WSButton>
              </div>
            </WSCol>
          </WSRow>
        </div>
      </section>
    </Form>
  )
}

export default ContactUsPage
