import React from 'react'
import { Form, InjectedFormikProps } from 'formik';
import { MutationFunction } from '@apollo/client';
// component
import { WSButton, WSCol, WSInput, WSLoader, WSRow } from 'src/component/common';
import { CommonForm, HeadElement } from 'src/component/core';
import SliderComponent from 'src/layouts/MainLayout';
// constant
import { Admin } from 'src/typeGeneratedAdmin';
import metaTitle from 'src/utils/metaTitle';
import { formLabelName } from 'src/utils/enums';


export interface UpdateAdminProfileProps {
  loading?: boolean
  initialData?: Admin
  mutate?: MutationFunction
  btnLoading?:boolean
}

export interface UpdateAdminProfileValues {
  name?:String
  email?:String
  mobileNumber?:String
}

const UpdateAdminProfile: React.FC<
InjectedFormikProps<UpdateAdminProfileProps, UpdateAdminProfileValues>
> = ({ handleSubmit, btnLoading, loading }) => {
  return (
    <>
    <HeadElement title={metaTitle?.adminProfile} />
      <SliderComponent>
        {loading ? (
        <WSLoader className="d-flex justify-content-center align-items-center h-100" />
        ): (
        <CommonForm cardTile="Edit Admin Profile"> 
        <Form>
        <WSRow gutter={[16, 15]}>
          <WSCol xs={24} sm={24} md={15} lg={15} xl={12} xxl={12}>
            <WSInput name="name" inputLabel />
          </WSCol>
          <WSCol xs={24} sm={24} md={15} lg={15} xl={12}  xxl={12}>
            <WSInput name="email" inputLabel label="E-mail Address" />
          </WSCol>
          <WSCol xs={24} sm={24} md={15} lg={15} xl={12} xxl={12}>
            <WSInput name="mobileNumber" inputLabel />
          </WSCol>
        </WSRow>
        <WSRow justify="center">
            <WSCol span={24}>
              <div className="d-flex justify-content-center mt-1">
                <WSButton
                  type='primary'
                  onClick={()=> handleSubmit()}
                  loading={btnLoading}
                >
                    {btnLoading ? formLabelName.submitting : formLabelName.submit}
                </WSButton>
              </div>
            </WSCol>
        </WSRow>
        </Form>
      </CommonForm>)}
      </SliderComponent>
      </>
  )
}

export default UpdateAdminProfile;