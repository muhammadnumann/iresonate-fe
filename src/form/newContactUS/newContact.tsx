/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Form } from 'formik'

import messageHelper from 'src/utils/message'
import { formLabelName } from 'src/utils/enums'
import { images } from 'src/utils/image';
import { Waypoint } from 'react-waypoint';

//Style
import './style.less'
import { WSInput, WSSelect, WSTextArea } from 'src/component/common'

export const Gender = [
  {
    title: "Male",
    id: "Male",
  },
  {
    title: "Female",
    id: "Female",
  },
  {
    title: "Not Specify",
    id: "Non",
  },
];
const NewContactUsPage = ({
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

  const [spinOnce, setSpinOnce] = useState(false);
  const [Gendervalue, setGendervalue] = useState('Are you?');
  return (
    <Form>
      <section className='contact mt-sm-5 mt-3 mb-4' id="contact_section">
        <Waypoint
          onEnter={() => { setSpinOnce(true) }}
          onLeave={() => { setSpinOnce(false) }}>
          <h2 className={`text-center connect-title ${spinOnce ? 'connect-animation' : ''}`}>
            {`Let's Connect`}
          </h2>
        </Waypoint>
        <div className='container p-0'>
          <div className='d-flex justify-content-center contact-success-message' >
            {successMessage && <div className='success-message'> <CheckCircleOutlined className='checkOutlined-icon' /> {messageHelper.ContactUsSuccess}</div>}
          </div>
          <div className='row mt-4'>
            <div className='col-12'>
              <div className='form-group'>
                <img src={images.user} alt="" className='input-icon' />
                <WSInput
                  placeholder={formLabelName.firstName}
                  className='form-control'
                  type='text'
                  name={"firstName"}
                />
              </div>
              <div className='form-group'>
                <img src={images.user} alt="" className='input-icon' />
                <WSInput
                  placeholder={formLabelName.lastName}
                  className='form-control'
                  type='text'
                  name={"lastName"}

                />
              </div>
              <div className='form-group'>
                <img src={images.email} alt="" className='input-icon' />
                <WSInput
                  placeholder={formLabelName.emailAddress}
                  className='form-control'
                  type='email'
                  name={"email"}
                />
              </div>
              <div className='form-group'>
                <img src={images.mobile} alt="" className='input-icon' />
                <WSInput
                  type='telephone'
                  placeholder={formLabelName.mobileNumber}
                  name='mobileNumber'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <img src={images.user} alt="" className='input-icon' />
                <WSSelect
                  data={Gender}
                  name="gender"
                  className='form-control'
                  value={Gendervalue}
                  onSelectItem={(value: string) => {
                    setGendervalue(value)
                    setFieldValue(value)
                  }}
                />
              </div>
            </div>
            <div className='col-12'>
              <div className='form-group'>
                <WSTextArea
                  name='message'
                  placeholder={formLabelName.message}
                  className='form-control p-3 textarea'
                />
              </div>
              <div className='form-group d-flex justify-content-center'>
                <button
                  type='submit'
                  onClick={() => {
                    console.log("Numan is Here")
                    handleSubmit()
                  }}
                  className='submit-btn'
                >
                  {loading ? formLabelName.submitting : formLabelName.submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Form >
  )
}

export default NewContactUsPage
